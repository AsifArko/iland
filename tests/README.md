# Testing Infrastructure

This directory contains the comprehensive testing setup for the Fermi Land project, designed to achieve 100% test coverage across all functions, classes, and UI components.

## Architecture

```
tests/
├── unit/           # Unit tests for individual functions and classes
├── integration/    # Integration tests for API endpoints and services
├── e2e/           # End-to-end tests for complete user workflows
├── utils/         # Test utilities and helpers
└── fixtures/      # Mock data and test fixtures
```

## Quick Start

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test types
npm run test:unit
npm run test:integration
npm run test:e2e

# Run tests in CI mode
npm run test:ci

# Debug tests
npm run test:debug
```

### Test Scripts

- `test` - Run all tests
- `test:watch` - Run tests in watch mode
- `test:coverage` - Run tests with coverage report
- `test:unit` - Run only unit tests
- `test:integration` - Run only integration tests
- `test:e2e` - Run only end-to-end tests
- `test:ci` - Run tests optimized for CI/CD
- `test:debug` - Run tests with debugging enabled

## Test Coverage Requirements

### 100% Coverage Targets

- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

### Coverage Exclusions

- Test files themselves
- Story files
- Type definition files
- Sanity studio files
- Build artifacts

## Test Types

### Unit Tests (`tests/unit/`)

Unit tests focus on testing individual functions, classes, and components in isolation.

**Examples:**

- Error handling classes
- Utility functions
- React components
- Custom hooks
- Business logic

**Structure:**

```
tests/unit/
├── lib/
│   ├── errors/
│   ├── email/
│   ├── stripe/
│   └── utils/
├── components/
│   ├── ui/
│   └── error-boundary/
└── hooks/
```

### Integration Tests (`tests/integration/`)

Integration tests verify that different parts of the system work together correctly.

**Examples:**

- API endpoint testing
- Database operations
- External service integration
- Authentication flows
- Payment processing

**Structure:**

```
tests/integration/
├── api/
│   ├── contact/
│   ├── stripe/
│   └── webhooks/
├── services/
└── workflows/
```

### End-to-End Tests (`tests/e2e/`)

E2E tests simulate real user interactions and complete workflows.

**Examples:**

- User registration and login
- Purchase flow
- Download process
- Contact form submission

**Structure:**

```
tests/e2e/
├── user-flows/
├── payment-flows/
└── admin-flows/
```

## Test Utilities

### Test Utils (`tests/utils/`)

- `test-utils.tsx` - React testing utilities and custom render function
- `global-setup.js` - Global test setup
- `global-teardown.js` - Global test cleanup

### Fixtures (`tests/fixtures/`)

- `mock-data.ts` - Comprehensive mock data for all entities
- User fixtures
- Order fixtures
- Download fixtures
- Stripe fixtures
- API response fixtures

## Testing Best Practices

### 1. Test Structure

```typescript
describe("Component/Function Name", () => {
  describe("specific behavior", () => {
    it("should do something specific", () => {
      // Arrange
      const input = "test";

      // Act
      const result = functionToTest(input);

      // Assert
      expect(result).toBe("expected");
    });
  });
});
```

### 2. Mocking

- Mock external dependencies
- Use `jest.mock()` for module mocking
- Create realistic mock data
- Reset mocks between tests

### 3. Async Testing

```typescript
it("should handle async operations", async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});
```

### 4. Error Testing

```typescript
it("should throw error for invalid input", () => {
  expect(() => {
    functionWithError("invalid");
  }).toThrow("Expected error message");
});
```

## Configuration

### Jest Configuration

- **Environment**: jsdom for React testing
- **Coverage**: 100% threshold for all metrics
- **Transform**: Next.js Babel preset
- **Setup**: Custom setup file with mocks
- **Timeout**: 10 seconds per test

### Test Environment

- **Node.js**: Latest LTS
- **Jest**: Latest version
- **React Testing Library**: Latest version
- **TypeScript**: Full support

## Coverage Reports

### HTML Report

After running `npm run test:coverage`, view the HTML report at:

```
coverage/lcov-report/index.html
```

### Console Report

Coverage is displayed in the console with:

- Statement coverage
- Branch coverage
- Function coverage
- Line coverage
- Uncovered line numbers

## 🚨 Error Handling

### Test Failures

When tests fail:

1. Check the error message
2. Verify mock data is correct
3. Ensure all dependencies are mocked
4. Check for timing issues in async tests

### Common Issues

- **Module not found**: Check import paths and Jest configuration
- **Mock not working**: Ensure mocks are set up before imports
- **Async test failures**: Add proper await statements
- **Coverage gaps**: Add tests for uncovered code paths

## Continuous Integration

### CI/CD Integration

Tests are automatically run in CI/CD pipelines:

- Pre-commit hooks
- Pull request checks
- Deployment validation

### Coverage Enforcement

- Coverage thresholds are enforced
- Build fails if coverage drops below 100%
- Coverage reports are generated and stored

## Writing New Tests

### 1. Choose Test Type

- **Unit**: For individual functions/components
- **Integration**: For API endpoints/services
- **E2E**: For complete user workflows

### 2. Create Test File

```typescript
// tests/unit/component-name.test.tsx
import { render, screen } from '@testing-library/react'
import { ComponentName } from '@/components/component-name'

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })
})
```

### 3. Use Test Utilities

```typescript
import { render, createMockUser } from "@/tests/utils/test-utils";

const mockUser = createMockUser({ name: "Test User" });
```

### 4. Add to Coverage

Ensure new code is included in coverage collection by:

- Adding to `collectCoverageFrom` in Jest config
- Writing comprehensive tests
- Testing all code paths

## 🎉 Success Metrics

- ✅ 100% test coverage
- ✅ All tests passing
- ✅ Fast test execution
- ✅ Reliable test results
- ✅ Comprehensive error handling
- ✅ Realistic test scenarios

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [TypeScript Testing](https://www.typescriptlang.org/docs/handbook/testing.html)
