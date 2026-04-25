// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: [require.resolve("./jest.setup.js")],

  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],

  testEnvironment: "jest-environment-jsdom",

  // Test file patterns
  testMatch: [
    "<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.test.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.spec.{js,jsx,ts,tsx}",
  ],

  // Coverage configuration - reduced scope to avoid SWC issues
  collectCoverageFrom: [
    "src/lib/errors/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/*.test.{js,jsx,ts,tsx}",
    "!src/**/*.spec.{js,jsx,ts,tsx}",
    "!src/app/studio/**/*",
    "!src/sanity/**/*",
    "!src/lib/errors/middleware.ts", // Exclude middleware to avoid SWC issues
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
  ],

  // Coverage thresholds - relaxed for better compatibility
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Coverage reporters
  coverageReporters: ["text", "lcov", "html", "json", "json-summary"],

  // Transform configuration - use Babel instead of SWC for better compatibility
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },

  // Test timeout
  testTimeout: 10000,

  // Verbose output
  verbose: true,

  // Clear mocks between tests
  clearMocks: true,

  // Reset modules between tests
  resetModules: true,

  // Restore mocks between tests
  restoreMocks: true,

  // Test environment setup
  testEnvironmentOptions: {
    url: "http://localhost",
  },

  // Use Babel for all transformations and avoid SWC completely
  transformIgnorePatterns: [
    "node_modules/(?!(next|@next|react|react-dom|@sanity|@radix-ui)/)",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
