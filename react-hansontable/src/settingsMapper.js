import Handsontable from "../handsontable/dist/handsontable.full";

export class SettingsMapper {
  constructor() {
    this.registeredHooks = Handsontable.hooks.getRegistered();
  }

  /**
   * Parse component settings into Handosntable-compatible settings.
   *
   * @param {Object} properties Object containing properties from the HotTable object.
   * @returns {Object} Handsontable-compatible settings object.
   */
  getSettings(properties) {
    let newSettings = {};
    if (properties.settings) {
      let settings = properties.settings;
      for (const key in settings) {
        if (settings.hasOwnProperty(key)) {
          newSettings[key] = settings[key];
        }
      }
    }

    for (const key in properties) {
      if (key !== "settings" && properties.hasOwnProperty(key)) {
        newSettings[key] = properties[key];
      }
    }
    return newSettings;
  }
}
