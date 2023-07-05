import { App, PluginSettingTab, Setting } from "obsidian";
import type CodeTitlePlugin from "./main";
import { camelToKebab } from "./utils";

export interface Settings {
  textColor: string;
  backgroundColor: string;
  roundRadius: string;
  paddingX: number;
}

export const DEFAULT_SETTINGS: Settings = {
  textColor: "#CFCFCF",
  backgroundColor: "#2E2E2E",
  roundRadius: "0.5em",
  paddingX: 4,
};

export function setCssVariablesFromSettings(
  element: HTMLElement,
  settings: Settings
) {
  for (const [key, value] of Object.entries(settings)) {
    const cssKey = `--code-title-${camelToKebab(key)}`;
    if (key === "paddingX") {
      element.style.setProperty(cssKey, `var(--size-4-${value})`);
    } else {
      element.style.setProperty(cssKey, value);
    }
  }
}

export class CodeTitleSettingTab extends PluginSettingTab {
  plugin: CodeTitlePlugin;

  constructor(app: App, plugin: CodeTitlePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();
    containerEl.createEl("h2", { text: "Settings for Code Title Plugin." });

    new Setting(containerEl)
      .setName("Code Title Text Color")
      .setDesc("Set the text color of the code block title.")
      .addColorPicker((colorPicker) =>
        colorPicker
          .setValue(this.plugin.settings.textColor)
          .onChange(async (value) => {
            this.plugin.settings.textColor = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Code Title Background Color")
      .setDesc("Set the background color of the code block title.")
      .addColorPicker((colorPicker) =>
        colorPicker
          .setValue(this.plugin.settings.backgroundColor)
          .onChange(async (value) => {
            this.plugin.settings.backgroundColor = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Code Title Round Radius")
      .setDesc("Set the round radius of the code block title. e.g. 1em, 6px")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.roundRadius)
          .onChange(async (value) => {
            this.plugin.settings.roundRadius = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Code Title Padding X")
      .setDesc("Set the x axis padding of the code block title.")
      .addSlider((slider) =>
        slider
          .setValue(this.plugin.settings.paddingX)
          .setLimits(1, 4, 1)
          .onChange(async (value) => {
            this.plugin.settings.paddingX = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
