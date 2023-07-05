import { MarkdownPostProcessorContext, MarkdownRenderChild } from "obsidian";
import CodeTitlePlugin from "./main";
import { setCssVariablesFromSettings } from "./settings";

export async function codeTitleProcessor(
  element: HTMLElement,
  context: MarkdownPostProcessorContext,
  plugin: CodeTitlePlugin
) {
  setCssVariablesFromSettings(document.body, plugin.settings);

  const codeBlocks = element.querySelectorAll("pre");
  codeBlocks.forEach((codeBlock) => {
    // e.g. "language-rust:hoge/main.rs"
    const text = Array.from(codeBlock.find("code").classList).find((c) =>
      c.startsWith("language-")
    );

    // e.g. "language-rust"
    const language = text?.split(":")[0];

    // e.g. "hoge/main.rs"
    const title = text?.split(":")[1];

    if (language && title) {
      context.addChild(new CodeTitle(element, language, title));
    }
  });
}

export class CodeTitle extends MarkdownRenderChild {
  title: string;
  language: string;
  containerEl: HTMLElement;
  margin: string;

  constructor(containerEl: HTMLElement, language: string, title: string) {
    super(containerEl);
    this.language = language;
    this.title = title;
    const preEl = document.getElementsByTagName("pre")[0];
    this.margin = window.getComputedStyle(preEl).getPropertyValue("margin-top");
  }

  onload() {
    this.setupSyntaxHighlighter();
    this.setupCodeTitle();
  }

  private setupSyntaxHighlighter() {
    const codeEl = this.containerEl.find("code");
    codeEl.addClass(this.language);
  }

  private setupCodeTitle() {
    const codeTitleEl = this.containerEl.createDiv({
      cls: "code-title",
      text: this.title,
    });
    const preEl = this.containerEl.find("pre");

    //* style
    preEl.addClass("code-block-with-title");
    preEl.style.marginTop = "0";
    codeTitleEl.style.marginTop = this.margin;

    //* insert code title element
    this.containerEl.firstChild?.before(codeTitleEl);
  }
}
