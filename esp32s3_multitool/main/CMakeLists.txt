idf_component_register(
    SRCS
        "main.c"
        "config.h"
        "ui.c"
        "input.c"
        "rf_cc1101.c"
        "nfc_pn532.c"
        "ir_rmt.c"
        "storage.c"
        "power.c"
        "wifi_net.c"
        "ota.c"
    INCLUDE_DIRS "."
    REQUIRES esp_lcd esp_timer esp_wifi esp_event nvs_flash driver spi_flash fatfs lvgl esp_http_server esp_https_ota
)
