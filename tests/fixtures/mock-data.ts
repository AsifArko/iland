// Mock data fixtures for comprehensive testing

// User fixtures
export const mockUsers = {
  basic: {
    id: "user-1",
    email: "test@example.com",
    name: "Test User",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  admin: {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  premium: {
    id: "premium-1",
    email: "premium@example.com",
    name: "Premium User",
    subscription: "premium",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
};

// Order fixtures
export const mockOrders = {
  pending: {
    _id: "order-pending-1",
    title: "Pending Order",
    subtitle: "Order is pending payment",
    status: "pending",
    email: "test@example.com",
    amount: 1000,
    currency: "usd",
    stripeSessionId: "cs_test_pending",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  completed: {
    _id: "order-completed-1",
    title: "Completed Order",
    subtitle: "Order has been completed",
    status: "completed",
    email: "test@example.com",
    amount: 2000,
    currency: "usd",
    stripeSessionId: "cs_test_completed",
    stripePaymentIntentId: "pi_test_completed",
    createdAt: "2024-01-01T00:00:00.000Z",
    completedAt: "2024-01-01T01:00:00.000Z",
  },
  failed: {
    _id: "order-failed-1",
    title: "Failed Order",
    subtitle: "Order payment failed",
    status: "failed",
    email: "test@example.com",
    amount: 1500,
    currency: "usd",
    stripeSessionId: "cs_test_failed",
    errorMessage: "Payment failed",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
};

// Download fixtures
export const mockDownloads = {
  active: {
    _id: "download-active-1",
    title: "Active Download",
    subtitle: "Download is active",
    status: "active",
    email: "test@example.com",
    downloadUrl: "https://example.com/download/active",
    expiresAt: "2024-12-31T23:59:59.000Z",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  expired: {
    _id: "download-expired-1",
    title: "Expired Download",
    subtitle: "Download has expired",
    status: "expired",
    email: "test@example.com",
    downloadUrl: "https://example.com/download/expired",
    expiresAt: "2024-01-01T00:00:00.000Z",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  used: {
    _id: "download-used-1",
    title: "Used Download",
    subtitle: "Download has been used",
    status: "used",
    email: "test@example.com",
    downloadUrl: "https://example.com/download/used",
    expiresAt: "2024-12-31T23:59:59.000Z",
    usedAt: "2024-01-01T01:00:00.000Z",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
};

// Stripe fixtures
export const mockStripePrices = {
  basic: {
    id: "price_basic",
    active: true,
    currency: "usd",
    unit_amount: 1000,
    product: "prod_basic",
    metadata: {
      type: "basic",
      features: "basic_features",
    },
  },
  premium: {
    id: "price_premium",
    active: true,
    currency: "usd",
    unit_amount: 2000,
    product: "prod_premium",
    metadata: {
      type: "premium",
      features: "premium_features",
    },
  },
  enterprise: {
    id: "price_enterprise",
    active: true,
    currency: "usd",
    unit_amount: 5000,
    product: "prod_enterprise",
    metadata: {
      type: "enterprise",
      features: "enterprise_features",
    },
  },
};

export const mockStripeSessions = {
  pending: {
    id: "cs_test_pending",
    object: "checkout.session",
    status: "open",
    payment_status: "unpaid",
    amount_total: 1000,
    currency: "usd",
    customer_email: "test@example.com",
    metadata: {
      orderId: "order-pending-1",
    },
  },
  completed: {
    id: "cs_test_completed",
    object: "checkout.session",
    status: "complete",
    payment_status: "paid",
    amount_total: 2000,
    currency: "usd",
    customer_email: "test@example.com",
    payment_intent: "pi_test_completed",
    metadata: {
      orderId: "order-completed-1",
    },
  },
};

// Sanity fixtures
export const mockSanityDocuments = {
  order: {
    _id: "order-sanity-1",
    _type: "order",
    title: "Sanity Order",
    subtitle: "Order from Sanity",
    status: "pending",
    email: "test@example.com",
    amount: 1000,
    currency: "usd",
    stripeSessionId: "cs_test_sanity",
    _createdAt: "2024-01-01T00:00:00.000Z",
    _updatedAt: "2024-01-01T00:00:00.000Z",
  },
  download: {
    _id: "download-sanity-1",
    _type: "download",
    title: "Sanity Download",
    subtitle: "Download from Sanity",
    status: "active",
    email: "test@example.com",
    downloadUrl: "https://example.com/download/sanity",
    expiresAt: "2024-12-31T23:59:59.000Z",
    _createdAt: "2024-01-01T00:00:00.000Z",
    _updatedAt: "2024-01-01T00:00:00.000Z",
  },
};

// API Response fixtures
export const mockApiResponses = {
  success: {
    success: true,
    message: "Operation completed successfully",
    data: {},
  },
  error: {
    success: false,
    error: {
      code: "TEST_ERROR",
      message: "Test error message",
      timestamp: "2024-01-01T00:00:00.000Z",
      requestId: "test-uuid-1234-5678-9012-345678901234",
    },
  },
  validationError: {
    success: false,
    error: {
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      details: {
        field: "email",
        message: "Invalid email format",
      },
      timestamp: "2024-01-01T00:00:00.000Z",
      requestId: "test-uuid-1234-5678-9012-345678901234",
    },
  },
};

// Form data fixtures
export const mockFormData = {
  contact: {
    name: "Test User",
    email: "test@example.com",
    subject: "Test Subject",
    message: "Test message content",
  },
  checkout: {
    email: "test@example.com",
    priceId: "price_basic",
    successUrl: "http://localhost:3000/success",
    cancelUrl: "http://localhost:3000/cancel",
  },
  download: {
    email: "test@example.com",
    orderId: "order-completed-1",
  },
};

// Error fixtures
export const mockErrors = {
  validation: {
    name: "ValidationError",
    message: "Validation failed",
    code: "VALIDATION_ERROR",
  },
  authentication: {
    name: "AuthenticationError",
    message: "Authentication failed",
    code: "AUTHENTICATION_ERROR",
  },
  database: {
    name: "DatabaseError",
    message: "Database connection failed",
    code: "DATABASE_ERROR",
  },
  network: {
    name: "NetworkError",
    message: "Network request failed",
    code: "NETWORK_ERROR",
  },
  stripe: {
    name: "StripeError",
    message: "Stripe payment failed",
    code: "STRIPE_ERROR",
  },
};

// Request fixtures
export const mockRequests = {
  get: {
    method: "GET",
    url: "http://localhost:3000/api/test",
    headers: {
      "content-type": "application/json",
      "user-agent": "test-agent",
    },
  },
  post: {
    method: "POST",
    url: "http://localhost:3000/api/test",
    headers: {
      "content-type": "application/json",
      "user-agent": "test-agent",
    },
    body: JSON.stringify({ test: "data" }),
  },
  withAuth: {
    method: "GET",
    url: "http://localhost:3000/api/protected",
    headers: {
      "content-type": "application/json",
      authorization: "Bearer test-token",
      "user-agent": "test-agent",
    },
  },
};

// Component props fixtures
export const mockComponentProps = {
  button: {
    children: "Test Button",
    onClick: jest.fn(),
    variant: "default",
    size: "default",
  },
  card: {
    title: "Test Card",
    description: "Test card description",
    children: "Card content",
  },
  form: {
    onSubmit: jest.fn(),
    children: "Form content",
  },
  modal: {
    isOpen: true,
    onClose: jest.fn(),
    title: "Test Modal",
    children: "Modal content",
  },
};

// Event fixtures
export const mockEvents = {
  click: {
    type: "click",
    target: document.createElement("button"),
    currentTarget: document.createElement("button"),
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
  submit: {
    type: "submit",
    target: document.createElement("form"),
    currentTarget: document.createElement("form"),
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
  change: {
    type: "change",
    target: document.createElement("input"),
    currentTarget: document.createElement("input"),
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
};

// Utility functions for creating dynamic fixtures
export const createMockOrder = (overrides = {}) => ({
  ...mockOrders.pending,
  ...overrides,
});

export const createMockDownload = (overrides = {}) => ({
  ...mockDownloads.active,
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  ...mockUsers.basic,
  ...overrides,
});

export const createMockStripePrice = (overrides = {}) => ({
  ...mockStripePrices.basic,
  ...overrides,
});

export const createMockApiResponse = (overrides = {}) => ({
  ...mockApiResponses.success,
  ...overrides,
});

export const createMockError = (overrides = {}) => ({
  ...mockErrors.validation,
  ...overrides,
});
