#include "input.h"
#include "driver/gpio.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "config.h"

static void buttons_task(void *arg) {
    while (1) {
        vTaskDelay(pdMS_TO_TICKS(50));
    }
}

void input_init(void) {
    gpio_config_t io_conf = {
        .mode = GPIO_MODE_INPUT,
        .pull_up_en = GPIO_PULLUP_ENABLE,
        .pin_bit_mask = (1ULL << PIN_BTN_OK) | (1ULL << PIN_BTN_BACK) |
                        (1ULL << PIN_BTN_UP) | (1ULL << PIN_BTN_DOWN)
    };
    gpio_config(&io_conf);
    xTaskCreate(buttons_task, "buttons", 2048, NULL, 5, NULL);
}
