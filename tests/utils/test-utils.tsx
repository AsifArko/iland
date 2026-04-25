import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom";

// Extend Jest matchers for TypeScript
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toHaveTextContent(text: string): R;
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}

// Mock next-themes since it's not available in test environment
const ThemeProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) => (
  <div data-testid="theme-provider" {...props}>
    {children}
  </div>
);

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt="" />;
  },
}));

// Mock Next.js Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// All the providers that your app needs
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { customRender as render };

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: "test-user-id",
  email: "test@example.com",
  name: "Test User",
  ...overrides,
});

export const createMockOrder = (overrides = {}) => ({
  _id: "test-order-id",
  title: "Test Order",
  subtitle: "Test Order Subtitle",
  status: "pending",
  email: "test@example.com",
  amount: 1000,
  currency: "usd",
  stripeSessionId: "test-session-id",
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const createMockDownload = (overrides = {}) => ({
  _id: "test-download-id",
  title: "Test Download",
  subtitle: "Test Download Subtitle",
  status: "active",
  email: "test@example.com",
  downloadUrl: "https://example.com/download",
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const createMockStripePrice = (overrides = {}) => ({
  id: "price_test123",
  active: true,
  currency: "usd",
  unit_amount: 1000,
  product: "prod_test123",
  ...overrides,
});

// Mock API responses
export const mockApiResponse = (data: unknown, status = 200) => {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  });
};

export const mockApiError = (message: string, status = 500) => {
  return Promise.reject(new Error(message));
};

// Test environment helpers
export const setTestEnvironment = () => {
  // NODE_ENV is read-only in production builds, so we'll skip setting it
  // process.env.NODE_ENV = "test";
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test-project-id";
  process.env.NEXT_PUBLIC_SANITY_DATASET = "test";
  process.env.SANITY_API_TOKEN = "test-token";
  process.env.STRIPE_SECRET_KEY = "test-stripe-key";
  process.env.STRIPE_WEBHOOK_SECRET = "test-webhook-secret";
};

export const resetTestEnvironment = () => {
  jest.clearAllMocks();
  jest.resetModules();
};

// Async test helpers
export const waitForElementToBeRemoved = (element: Element | null) => {
  return new Promise<void>(resolve => {
    if (!element) {
      resolve();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!document.contains(element)) {
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

// Form testing helpers
export const fillForm = async (formData: Record<string, string>) => {
  const userEvent = await import("@testing-library/user-event");
  const user = userEvent.default;
  const userEventInstance = user.setup();

  for (const [name, value] of Object.entries(formData)) {
    const input = document.querySelector(
      `[name="${name}"]`
    ) as HTMLInputElement;
    if (input) {
      await userEventInstance.type(input, value);
    }
  }
};

export const submitForm = async (formSelector = "form") => {
  const userEvent = await import("@testing-library/user-event");
  const user = userEvent.default;
  const userEventInstance = user.setup();

  const form = document.querySelector(formSelector) as HTMLFormElement;
  if (form) {
    await userEventInstance.click(
      form.querySelector('button[type="submit"]') as HTMLButtonElement
    );
  }
};

// Mock fetch with specific responses
export const mockFetch = (responses: Record<string, unknown>) => {
  global.fetch = jest.fn((url: string) => {
    const response = responses[url] || responses["*"];
    if (response) {
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(response),
      });
    }
    return Promise.reject(new Error(`No mock for URL: ${url}`));
  }) as jest.MockedFunction<typeof fetch>;
};

// Test cleanup
export const cleanupTest = () => {
  jest.clearAllMocks();
  jest.resetModules();
  localStorage.clear();
  sessionStorage.clear();
};

// Custom matchers
export const expectElementToBeVisible = (element: Element | null) => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
};

export const expectElementToHaveText = (
  element: Element | null,
  text: string
) => {
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(text);
};

export const expectElementToHaveAttribute = (
  element: Element | null,
  attribute: string,
  value: string
) => {
  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute(attribute, value);
};

// Performance testing helpers
export const measurePerformance = async (fn: () => void | Promise<void>) => {
  const start = performance.now();
  await fn();
  const end = performance.now();
  return end - start;
};

// Accessibility testing helpers
export const checkAccessibility = async (container: HTMLElement) => {
  // Basic accessibility checks
  const images = container.querySelectorAll("img");
  images.forEach(img => {
    expect(img).toHaveAttribute("alt");
  });

  const buttons = container.querySelectorAll("button");
  buttons.forEach(button => {
    expect(button).toHaveAttribute("aria-label");
  });
};

// Error boundary testing helpers
export const triggerError = () => {
  throw new Error("Test error");
};

export const createErrorComponent = () => {
  return () => {
    throw new Error("Component error");
  };
};
