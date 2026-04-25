// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "/",
      query: {},
      asPath: "/",
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return "/";
  },
}));

// Mock crypto for UUID generation
if (!global.crypto) {
  global.crypto = {
    randomUUID: () => "test-uuid-1234-5678-9012-345678901234",
  };
}

// Mock fetch globally
global.fetch = jest.fn();

// Mock Request constructor
global.Request = class Request {
  constructor(url, init = {}) {
    this.url = url;
    this.method = init.method || "GET";
    this.headers = new Map(Object.entries(init.headers || {}));
    this.body = init.body;
  }
};

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Suppress all console output during tests to reduce noise
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  // error is handled separately below
};

// Mock environment variables
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
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: jest.fn(),
});

// Mock window.alert
Object.defineProperty(window, "alert", {
  writable: true,
  value: jest.fn(),
});

// Mock window.confirm
Object.defineProperty(window, "confirm", {
  writable: true,
  value: jest.fn(),
});

// Mock window.prompt
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

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => "mocked-url");

// Mock URL.revokeObjectURL
global.URL.revokeObjectURL = jest.fn();

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));

// Mock cancelAnimationFrame
global.cancelAnimationFrame = jest.fn();

// Mock performance.now
global.performance.now = jest.fn(() => 1234567890);

// Mock getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => "",
  }),
});

// Mock Element.prototype methods
Element.prototype.scrollIntoView = jest.fn();
Element.prototype.scrollTo = jest.fn();

// Mock HTMLElement.prototype methods
HTMLElement.prototype.focus = jest.fn();
HTMLElement.prototype.blur = jest.fn();
HTMLElement.prototype.click = jest.fn();

// Mock console.error to fail tests on React warnings
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn(); // Completely silence console.error during tests
});

afterAll(() => {
  console.error = originalError;
});
