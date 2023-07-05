import { Plugin } from "obsidian";
import {
  DEFAULT_SETTINGS,
  type Settings,
  CodeTitleSettingTab,
  setCssVariablesFromSettings,
} from "./settings";
import { codeTitleProcessor } from "./markdown";

export default class CodeTitlePlugin extends Plugin {
  settings: Settings;

  async onload() {
    await this.loadSettings();
    this.init();

    this.registerMarkdownPostProcessor((element, context) =>
      codeTitleProcessor(element, context)
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
    setCssVariablesFromSettings(document.body, this.settings);
    this.init();
  }
}
