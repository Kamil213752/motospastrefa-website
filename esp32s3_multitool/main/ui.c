#include "ui.h"
#include "config.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_lcd_panel_io.h"
#include "esp_lcd_panel_ops.h"
#include "esp_lcd_panel_vendor.h"
#include "driver/spi_master.h"
#include "driver/gpio.h"
#include "esp_lvgl_port.h"
#include "lvgl.h"

#define LCD_H_RES 170
#define LCD_V_RES 320

static lv_disp_t *disp;
static const char *TAG = "ui";

static void create_home(void) {
    lv_obj_t *scr = lv_scr_act();
    lv_obj_set_style_bg_color(scr, lv_color_hex(0x101820), 0);
    lv_obj_set_style_bg_grad_color(scr, lv_color_hex(0x0f2b46), 0);
    lv_obj_set_style_bg_grad_dir(scr, LV_GRAD_DIR_VER, 0);

    static const char *tiles[] = {
        "Sub-GHz", "NFC", "IR", "RFID", "Wi-Fi/BLE", "Storage", "Settings", "Power", ""
    };

    lv_obj_t *cont = lv_tileview_create(scr);
    lv_obj_set_size(cont, LV_PCT(100), LV_PCT(100));

    uint8_t idx = 0;
    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 4; c++) {
            if (tiles[idx][0] == '\0') break;
            lv_obj_t *btn = lv_btn_create(cont);
            lv_obj_set_size(btn, 75, 70);
            lv_obj_set_style_bg_color(btn, lv_color_hex(0x1f6feb), 0);
            lv_obj_set_style_radius(btn, 12, 0);
            lv_obj_set_style_bg_opa(btn, LV_OPA_80, 0);
            lv_obj_align(btn, LV_ALIGN_TOP_LEFT, 10 + c * 80, 15 + r * 85);

            lv_obj_t *label = lv_label_create(btn);
            lv_label_set_text(label, tiles[idx]);
            lv_obj_center(label);
            idx++;
        }
    }
}

void ui_init(void) {
    spi_bus_config_t buscfg = {
        .sclk_io_num = PIN_LCD_SCLK,
        .mosi_io_num = PIN_LCD_MOSI,
        .miso_io_num = -1,
        .quadwp_io_num = -1,
        .quadhd_io_num = -1,
        .max_transfer_sz = LCD_H_RES * 80 * sizeof(uint16_t)
    };
    ESP_ERROR_CHECK(spi_bus_initialize(SPI2_HOST, &buscfg, SPI_DMA_CH_AUTO));

    esp_lcd_panel_io_spi_config_t io_config = {
        .dc_gpio_num = PIN_LCD_DC,
        .cs_gpio_num = PIN_LCD_CS,
        .pclk_hz = 40 * 1000 * 1000,
        .lcd_cmd_bits = 8,
        .lcd_param_bits = 8,
        .spi_mode = 2,
        .trans_queue_depth = 10,
    };
    esp_lcd_panel_io_handle_t io_handle = NULL;
    ESP_ERROR_CHECK(esp_lcd_new_panel_io_spi((esp_lcd_spi_bus_handle_t)SPI2_HOST, &io_config, &io_handle));

    esp_lcd_panel_dev_config_t panel_config = {
        .reset_gpio_num = PIN_LCD_RST,
        .rgb_ele_order = LCD_RGB_ELEMENT_ORDER_RGB,
        .bits_per_pixel = 16,
    };
    esp_lcd_panel_handle_t panel_handle = NULL;
    ESP_ERROR_CHECK(esp_lcd_new_panel_st7789(io_handle, &panel_config, &panel_handle));
    esp_lcd_panel_reset(panel_handle);
    esp_lcd_panel_init(panel_handle);
    esp_lcd_panel_disp_on_off(panel_handle, true);

    // Backlight
    gpio_config_t io_conf = {
        .mode = GPIO_MODE_OUTPUT,
        .pin_bit_mask = 1ULL << PIN_LCD_BL,
    };
    gpio_config(&io_conf);
    gpio_set_level(PIN_LCD_BL, 1);

    const lvgl_port_cfg_t lvgl_cfg = {
        .task_priority = 5,
        .task_stack = 4096,
        .task_affinity = -1,
        .task_max_sleep_ms = 10,
        .timer_period_ms = 5,
    };
    lvgl_port_init(&lvgl_cfg);

    const lvgl_port_display_cfg_t disp_cfg = {
        .io_handle = io_handle,
        .panel_handle = panel_handle,
        .buffer_size = LCD_H_RES * 40,
        .double_buffer = true,
        .hres = LCD_H_RES,
        .vres = LCD_V_RES,
        .monochrome = false,
        .color_space = LVGL_PORT_COLOR_FORMAT_RGB565,
        .bits_per_pixel = 16,
    };
    disp = lvgl_port_add_disp(&disp_cfg);
    lv_disp_set_rotation(disp, LV_DISP_ROT_180);
    lv_disp_set_default(disp);

    create_home();
}

void ui_show_home(void) {
    create_home();
}

void ui_loop(void) {
    lv_timer_handler();
}
