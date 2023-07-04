import { Plugin } from "obsidian";
import {
  DEFAULT_SETTINGS,
  type Settings,
  CodeTitleSettingTab,
} from "./settings";
import { AppHelper } from "./app_helper";
import { createCommands } from "./commands";

export default class CodeTitlePlugin extends Plugin {
  settings: Settings;
  appHelper: AppHelper;

  async onload() {
    await this.loadSettings();
    this.appHelper = new AppHelper(this.app);
    this.init();

    createCommands(this.appHelper, this.settings).forEach((c) =>
      this.addCommand(c)
    );

    this.addSettingTab(new CodeTitleSettingTab(this.app, this));
  }

  private init() {
    // UIなどの登録系はここ
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.init();
  }
}
