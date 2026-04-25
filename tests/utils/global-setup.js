// Global test setup
module.exports = async () => {
  // Set test environment variables
  process.env.NODE_ENV = "test";
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test-project-id";
  process.env.NEXT_PUBLIC_SANITY_DATASET = "test";
  process.env.SANITY_API_TOKEN = "test-token";
  process.env.STRIPE_SECRET_KEY = "test-stripe-key";
  process.env.STRIPE_WEBHOOK_SECRET = "test-webhook-secret";
  process.env.EMAIL_SERVER_HOST = "test-host";
  process.env.EMAIL_SERVER_PORT = "587";
  process.env.EMAIL_SERVER_USER = "test-user";
  process.env.EMAIL_SERVER_PASSWORD = "test-password";
  process.env.EMAIL_FROM = "test@example.com";
  process.env.LOG_LEVEL = "error";
  process.env.LOG_FORMAT = "json";

  // Mock crypto for consistent UUID generation
  global.crypto = {
    randomUUID: () => "test-uuid-1234-5678-9012-345678901234",
  };

  // Mock fetch globally
  global.fetch = jest.fn();

  // Mock console methods to reduce noise
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  // Mock ResizeObserver
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  // Mock IntersectionObserver
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  // Mock matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock window methods
  Object.defineProperty(window, "scrollTo", {
    writable: true,
    value: jest.fn(),
  });

  Object.defineProperty(window, "alert", {
    writable: true,
    value: jest.fn(),
  });

  Object.defineProperty(window, "confirm", {
    writable: true,
    value: jest.fn(),
  });

  Object.defineProperty(window, "prompt", {
    writable: true,
    value: jest.fn(),
  });

  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock;

  // Mock sessionStorage
  const sessionStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  global.sessionStorage = sessionStorageMock;

  // Mock URL methods
  global.URL.createObjectURL = jest.fn(() => "mocked-url");
  global.URL.revokeObjectURL = jest.fn();

  // Mock animation frame methods
  global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
  global.cancelAnimationFrame = jest.fn();

  // Mock performance
  global.performance.now = jest.fn(() => 1234567890);

  // Mock getComputedStyle
  Object.defineProperty(window, "getComputedStyle", {
    value: () => ({
      getPropertyValue: () => "",
    }),
  });

  // Mock Element methods
  Element.prototype.scrollIntoView = jest.fn();
  Element.prototype.scrollTo = jest.fn();

  // Mock HTMLElement methods
  HTMLElement.prototype.focus = jest.fn();
  HTMLElement.prototype.blur = jest.fn();
  HTMLElement.prototype.click = jest.fn();

  console.log("Global test setup completed");
};
