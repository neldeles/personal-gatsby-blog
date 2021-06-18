---
aliases:
tags: ['qmk']
references:
---

# QMK Configurator
1. Export json file from config.qmk.fm
2. Using QMK MSYS, navigate to folder where that json file is stored. 
3. Conver the json file to a C file: `qmk json2c -o <output_name> json_filename`
4. Add any unavailable QMK Configurator code to the C file. For example for my Preonic V3, I want to change the LED color for each layer:
```c
void eeconfig_init_user(void) {  // EEPROM is getting reset!
  // use the non noeeprom versions, to write these values to EEPROM too
  rgblight_enable(); // Enable RGB by default
  rgblight_sethsv_white();  // Set it to white by default
  rgblight_mode(RGBLIGHT_MODE_BREATHING); // set to breathing by default
}

layer_state_t layer_state_set_user(layer_state_t state) {
  rgblight_config_t rgblight_config;
  switch(biton32(state)) {
  case 1:
    // Red
    rgblight_enable_noeeprom();	
    rgblight_sethsv_noeeprom(HSV_RED);
    break;
  case 2:
    // Blue
    rgblight_enable_noeeprom();
    rgblight_sethsv_noeeprom(HSV_BLUE);
    break;
  case 3:
    // Orange
    rgblight_enable_noeeprom();
    rgblight_sethsv_noeeprom(HSV_PURPLE);
    break;
  default:
    // White
    //Read RGB Light State
    rgblight_config.raw = eeconfig_read_rgblight();
    //If enabled, set white
    if (rgblight_config.enable) {
		rgblight_sethsv_noeeprom(HSV_WHITE);
	} else { //Otherwise go back to disabled
		rgblight_disable_noeeprom();
	}
    break;
}
return state;
}
```
5. In your qmk_firmware > keyboards > preonic > keymaps > neldeles folder, copy the code into the C file. 
6. In QMK MSYS, run: `qmk compile -km neldeles`
7. Open QMK Toolbox and load the generated `.bin` file 
8. Put your kb into DFU mode (for my preonic you just hit the reset button) then flash your firmware
# Footer
---
Related: 