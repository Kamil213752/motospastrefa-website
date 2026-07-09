#pragma once

// LCD pins
#define PIN_LCD_MOSI 11
#define PIN_LCD_SCLK 9
#define PIN_LCD_DC   40
#define PIN_LCD_CS   16
#define PIN_LCD_RST  41
#define PIN_LCD_BL   21

// TF card (SPI)
#define PIN_TF_CS    13
#define PIN_TF_MOSI  PIN_LCD_MOSI
#define PIN_TF_MISO  10
#define PIN_TF_SCLK  PIN_LCD_SCLK

// CC1101
#define PIN_CC1101_CS   5
#define PIN_CC1101_GDO0 18
#define PIN_CC1101_GDO2 17

// PN532 I2C
#define PIN_PN532_SDA 1
#define PIN_PN532_SCL 3

// IR
#define PIN_IR_EN  2
#define PIN_IR_RX  15
#define PIN_IR_TX  4

// Power / battery
#define PIN_POWER_DETECT 4
#define PIN_BATT_ADC     7

// Buttons (example)
#define PIN_BTN_OK   35
#define PIN_BTN_BACK 36
#define PIN_BTN_UP   37
#define PIN_BTN_DOWN 38

// Wi-Fi
#define WIFI_AP_SSID "multitool"
#define WIFI_AP_PASS "12345678"
