# monitorek — system kalibracji monitora zewnętrznego

**Monitor:** Gigabyte G27QC (2560x1440 @ 120Hz, HDMI)
**Daemon:** MonitorekDaemon (Swift, natywny macOS)

---

## Komendy

```bash
monitorek              # status — pokaż stan wszystkiego
monitorek start        # uruchom daemon
monitorek stop         # zatrzymaj daemon
monitorek restart      # restart daemon
monitorek profile deep # profil ICC: głęboka czerń (domyślny)
monitorek profile pro  # profil ICC: referencyjny czysty
monitorek font 3       # font smoothing: 3=strong (Retina-like)
monitorek log          # ostatnie 30 linii logu
monitorek logf         # podążaj za logiem (tail -f)
monitorek config       # edytuj konfigurację daemon
monitorek install      # przeinstaluj wszystko od zera
monitorek uninstall    # usuń daemon
```

---

## Co robi daemon (MonitorekDaemon)

Natywny proces systemowy Swift — startuje automatycznie z systemem.

1. **Synchronizacja jasności** — mapuje nity 1:1 między MacBookiem (500 nits max) a monitorkiem (250 nits max). Zmiana jasności MacBooka automatycznie dostosowuje monitorek.
2. **Auto-aplikacja profilu ICC** — po starcie systemu i po każdym podłączeniu monitora automatycznie ustawia profil kolorów.
3. **Detekcja podłączenia/odłączenia** — rozpoznaje kiedy monitor jest podłączany/odłączany.

### Zużycie zasobów
- **CPU:** 0.0% (timer co 1s, OS coalesce)
- **RAM:** ~12 MB
- **Priorytet:** Nice 10, LowPriorityIO (nie zamula kompa)

---

## Profile ICC

| Profil | Gamma | Shadow Crush | Najlepszy do |
|--------|-------|-------------|-------------|
| **Pro Deep Black** | 2.35 | 0.55 | Codzienne — głęboka czerń, bez przekłamań |
| **Professional** | 2.20 | — | Referencyjna dokładność, grafika |

### Parametry techniczne
- **Gamut:** natywne prymary z EDID (szersza niż sRGB, ~DCI-P3)
- **Biały punkt:** D65 (6500K)
- **TRC:** 4096-entry curve (zero bandingu)
- **VCGT:** shadow crush w Deep Black, passthrough w Professional

---

## Ustawienia OSD monitora (fizyczne menu)

Joystick z tyłu monitora:

| Ustawienie | Wartość |
|---|---|
| **Input Color Format** | `RGB` |
| **RGB Range** | `Full` (0-255) |
| **Dynamic Contrast** | `OFF` |
| **Low Blue Light** | `OFF` |
| **Color Temperature** | `Custom` (R:100 G:97 B:95) |
| **Black Equalizer** | `10` |
| **Overdrive** | `Picture Quality` |

---

## Konfiguracja daemon

`~/Library/Application Support/MonitorekDaemon/config.json`:

```json
{
  "macbook_max_nits": 500,
  "external_max_nits": 250,
  "poll_interval": 1,
  "deadzone": 0.005,
  "smoothing": 0.3,
  "icc_profile": "Monitorek-Pro-Deep-Black.icc"
}
```

---

## Pliki

```
~/Library/LaunchAgents/
  com.monitorek.daemon.plist          launchd agent (auto-start)

~/Library/ColorSync/Profiles/
  Monitorek-Pro-Deep-Black.icc        profil ICC (aktywny)
  Monitorek-Professional.icc          profil ICC (referencyjny)

~/Library/Application Support/MonitorekDaemon/
  config.json                         konfiguracja daemon

~/.local/bin/
  monitorek                           komenda zarządzająca (symlink)
  switch_profile                      przełącznik profili (symlink)

~/CascadeProjects/monitor-calibration/
  MonitorekDaemon.swift               daemon (źródło)
  MonitorekDaemon                     daemon (binary)
  switch_profile.swift                przełącznik (źródło)
  switch_profile                      przełącznik (binary)
  create_profile.py                   generator profili ICC
  monitorek                           skrypt zarządzający
  brightness_sync.py                  stary daemon Python (nieużywany)
  README.md                           ten plik
```
