#!/usr/bin/env swift
/**
 MonitorekDaemon — natywny daemon systemowy macOS
 
 Funkcje:
 1. Synchronizacja jasności MacBook ↔ monitorek (nity 1:1)
 2. Minimalne zużycie CPU (event-driven + timer 1s)
 
 Zużycie: ~3MB RAM, ~0% CPU (budzi się co 1s na odczyt jasności)
 */

import Foundation
import CoreGraphics

// MARK: - Configuration

struct Config {
    var macbookMaxNits: Double = 500.0
    var externalMaxNits: Double = 250.0
    var pollInterval: TimeInterval = 1.0  // seconds
    var deadzone: Double = 0.005
    var smoothingFactor: Double = 0.3
    
    static let configPath = NSString("~/Library/Application Support/MonitorekDaemon/config.json").expandingTildeInPath
    
    mutating func load() {
        let url = URL(fileURLWithPath: Config.configPath)
        guard let data = try? Data(contentsOf: url),
              let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else { return }
        
        if let v = json["macbook_max_nits"] as? Double { macbookMaxNits = v }
        if let v = json["external_max_nits"] as? Double { externalMaxNits = v }
        if let v = json["poll_interval"] as? Double { pollInterval = v }
        if let v = json["deadzone"] as? Double { deadzone = v }
        if let v = json["smoothing"] as? Double { smoothingFactor = v }
    }
    
    func save() {
        let dir = (Config.configPath as NSString).deletingLastPathComponent
        try? FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)
        
        let json: [String: Any] = [
            "macbook_max_nits": macbookMaxNits,
            "external_max_nits": externalMaxNits,
            "poll_interval": pollInterval,
            "deadzone": deadzone,
            "smoothing": smoothingFactor,
        ]
        if let data = try? JSONSerialization.data(withJSONObject: json, options: .prettyPrinted) {
            try? data.write(to: URL(fileURLWithPath: Config.configPath))
        }
    }
}

// MARK: - DisplayServices (private framework)

private let displayServices: UnsafeMutableRawPointer = {
    dlopen("/System/Library/PrivateFrameworks/DisplayServices.framework/DisplayServices", RTLD_LAZY)
}()

private typealias GetBrightnessFn = @convention(c) (UInt32, UnsafeMutablePointer<Float>) -> Int32
private typealias SetBrightnessFn = @convention(c) (UInt32, Float) -> Int32

private let _getBrightness: GetBrightnessFn = {
    let sym = dlsym(displayServices, "DisplayServicesGetBrightness")!
    return unsafeBitCast(sym, to: GetBrightnessFn.self)
}()

private let _setBrightness: SetBrightnessFn = {
    let sym = dlsym(displayServices, "DisplayServicesSetBrightness")!
    return unsafeBitCast(sym, to: SetBrightnessFn.self)
}()

func getBrightness(_ displayID: CGDirectDisplayID) -> Float? {
    var b: Float = 0
    guard _getBrightness(displayID, &b) == 0 else { return nil }
    return b
}

func setBrightness(_ displayID: CGDirectDisplayID, _ value: Float) -> Bool {
    let clamped = max(0.0, min(1.0, value))
    return _setBrightness(displayID, clamped) == 0
}

// MARK: - Display Utilities

struct DisplayInfo {
    let id: CGDirectDisplayID
    let isBuiltin: Bool
    let width: Int
    let height: Int
}

func getDisplays() -> [DisplayInfo] {
    var count: UInt32 = 0
    CGGetActiveDisplayList(0, nil, &count)
    guard count > 0 else { return [] }
    
    var ids = [CGDirectDisplayID](repeating: 0, count: Int(count))
    CGGetActiveDisplayList(count, &ids, &count)
    
    return ids.prefix(Int(count)).map { id in
        let bounds = CGDisplayBounds(id)
        return DisplayInfo(
            id: id,
            isBuiltin: CGDisplayIsBuiltin(id) != 0,
            width: Int(bounds.width),
            height: Int(bounds.height)
        )
    }
}

// MARK: - Logging

let logPath = NSString("~/Library/Logs/monitorek-daemon.log").expandingTildeInPath
let dateFormatter: DateFormatter = {
    let f = DateFormatter()
    f.dateFormat = "yyyy-MM-dd HH:mm:ss"
    return f
}()

func log(_ msg: String) {
    let ts = dateFormatter.string(from: Date())
    let line = "[\(ts)] \(msg)\n"
    fputs(line, stderr)
}

// MARK: - Brightness Sync Engine

class BrightnessSyncEngine {
    var config: Config
    var currentSmoothed: Double?
    var lastApplied: Double?
    var lastExternalCount = 0
    
    init(config: Config) {
        self.config = config
    }
    
    func tick() {
        let displays = getDisplays()
        let builtins = displays.filter { $0.isBuiltin }
        let externals = displays.filter { !$0.isBuiltin }
        
        // Detect monitor connect/disconnect
        if externals.count != lastExternalCount {
            if externals.count > lastExternalCount {
                log("External monitor connected (\(externals.count) display(s))")
            } else {
                log("External monitor disconnected")
            }
            lastExternalCount = externals.count
        }
        
        guard let builtin = builtins.first, !externals.isEmpty else { return }
        
        // Read MacBook brightness
        guard let mbBrightness = getBrightness(builtin.id) else { return }
        
        // Map nits: MacBook → external
        let mbNits = Double(mbBrightness) * config.macbookMaxNits
        let targetNits = min(mbNits, config.externalMaxNits)
        let targetBrightness = targetNits / config.externalMaxNits
        
        // Smooth transition
        if let current = currentSmoothed {
            currentSmoothed = current + config.smoothingFactor * (targetBrightness - current)
        } else {
            currentSmoothed = targetBrightness
        }
        
        guard let smoothed = currentSmoothed else { return }
        
        // Only update if change exceeds deadzone
        if let last = lastApplied, abs(smoothed - last) < config.deadzone {
            return
        }
        
        for ext in externals {
            _ = setBrightness(ext.id, Float(smoothed))
        }
        lastApplied = smoothed
    }
}

// MARK: - Main

var config = Config()
config.load()
config.save()

log("MonitorekDaemon starting")
log("  MacBook max nits: \(config.macbookMaxNits)")
log("  External max nits: \(config.externalMaxNits)")
log("  Poll interval: \(config.pollInterval)s")
log("  PID: \(ProcessInfo.processInfo.processIdentifier)")

let engine = BrightnessSyncEngine(config: config)

// Initial tick
engine.tick()

// Set up timer on run loop (event-driven, CPU sleeps between ticks)
let timer = Timer.scheduledTimer(withTimeInterval: config.pollInterval, repeats: true) { _ in
    engine.tick()
}
timer.tolerance = config.pollInterval * 0.5 // allow OS to coalesce timers for power savings

// Handle SIGTERM gracefully
signal(SIGTERM) { _ in
    log("MonitorekDaemon stopped (SIGTERM)")
    exit(0)
}
signal(SIGINT) { _ in
    log("MonitorekDaemon stopped (SIGINT)")
    exit(0)
}

// Run forever
RunLoop.current.run()
