export function camelToKebab(str: string) {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
}

/*
 * Get CSS variable value.
 * e.g. getCssVariable("--code-title-text-color")
 */
export function getCssVariable(key: string) {
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(key);
}
