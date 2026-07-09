#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_event.h"
#include "esp_wifi.h"
#include "driver/gpio.h"
#include "config.h"
#include "ui.h"
#include "input.h"
#include "rf_cc1101.h"
#include "nfc_pn532.h"
#include "ir_rmt.h"
#include "storage.h"
#include "power.h"
#include "wifi_net.h"
#include "ota.h"

static const char *TAG = "app";

void app_main(void) {
    ESP_ERROR_CHECK(nvs_flash_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    storage_init();
    power_init();
    ui_init();
    input_init();
    rf_cc1101_init();
    nfc_pn532_init();
    ir_init();
    wifi_net_init();
    ota_init();

    ui_show_home();

    while (true) {
        ui_loop();
        vTaskDelay(pdMS_TO_TICKS(10));
    }
}
