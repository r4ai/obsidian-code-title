import { App, PluginSettingTab, Setting } from "obsidian";
import type CodeTitlePlugin from "./main";

export interface Settings {
  hoge: string;
}

export const DEFAULT_SETTINGS: Settings = {
  hoge: "",
};

export class CodeTitleSettingTab extends PluginSettingTab {
  plugin: CodeTitlePlugin;

  constructor(app: App, plugin: CodeTitlePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h2", { text: "Settings for my awesome plugin." });

    new Setting(containerEl)
      .setName("Setting #1")
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder("Enter your secret")
          .setValue(this.plugin.settings.hoge)
          .onChange(async (value) => {
            console.log("Secret: " + value);
            this.plugin.settings.hoge = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
