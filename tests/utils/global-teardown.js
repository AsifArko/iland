// Global test teardown
module.exports = async () => {
  // Clean up any global mocks
  jest.clearAllMocks();
  jest.resetModules();

  // Clean up localStorage and sessionStorage
  if (global.localStorage) {
    global.localStorage.clear();
  }
  if (global.sessionStorage) {
    global.sessionStorage.clear();
  }

  // Clean up fetch mock
  if (global.fetch) {
    global.fetch.mockClear();
  }

  // Clean up console mocks
  if (global.console) {
    Object.keys(global.console).forEach(key => {
      if (
        global.console[key] &&
        typeof global.console[key].mockClear === "function"
      ) {
        global.console[key].mockClear();
      }
    });
  }

  // Clean up URL mocks
  if (global.URL.createObjectURL) {
    global.URL.createObjectURL.mockClear();
  }
  if (global.URL.revokeObjectURL) {
    global.URL.revokeObjectURL.mockClear();
  }

  // Clean up animation frame mocks
  if (global.requestAnimationFrame) {
    global.requestAnimationFrame.mockClear();
  }
  if (global.cancelAnimationFrame) {
    global.cancelAnimationFrame.mockClear();
  }

  // Clean up performance mock
  if (global.performance && global.performance.now) {
    global.performance.now.mockClear();
  }

  // Clean up crypto mock
  if (global.crypto && global.crypto.randomUUID) {
    global.crypto.randomUUID.mockClear();
  }

  // Clean up ResizeObserver mock
  if (global.ResizeObserver) {
    global.ResizeObserver.mockClear();
  }

  // Clean up IntersectionObserver mock
  if (global.IntersectionObserver) {
    global.IntersectionObserver.mockClear();
  }

  // Clean up window method mocks
  if (window.scrollTo) {
    window.scrollTo.mockClear();
  }
  if (window.alert) {
    window.alert.mockClear();
  }
  if (window.confirm) {
    window.confirm.mockClear();
  }
  if (window.prompt) {
    window.prompt.mockClear();
  }

  // Clean up Element method mocks
  if (Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView.mockClear();
  }
  if (Element.prototype.scrollTo) {
    Element.prototype.scrollTo.mockClear();
  }

  // Clean up HTMLElement method mocks
  if (HTMLElement.prototype.focus) {
    HTMLElement.prototype.focus.mockClear();
  }
  if (HTMLElement.prototype.blur) {
    HTMLElement.prototype.blur.mockClear();
  }
  if (HTMLElement.prototype.click) {
    HTMLElement.prototype.click.mockClear();
  }

  // Clean up matchMedia mock
  if (window.matchMedia) {
    window.matchMedia.mockClear();
  }

  // Clean up getComputedStyle mock
  if (window.getComputedStyle) {
    window.getComputedStyle.mockClear();
  }

  console.log("Global test teardown completed");
};
