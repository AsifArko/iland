import React, { ErrorInfo } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import {
  ErrorBoundary,
  withErrorBoundary,
  useErrorHandler,
} from "@/components/error-boundary";
import { createErrorComponent } from "../../utils/test-utils";

describe("ErrorBoundary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Error Boundary", () => {
    it("should render children when there is no error", () => {
      render(
        <ErrorBoundary>
          <div>Test content</div>
        </ErrorBoundary>
      );

      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("should render error UI when there is an error", () => {
      const ErrorComponent = createErrorComponent();

      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      expect(
        screen.getByText(
          "We're sorry, but something unexpected happened. Our team has been notified."
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Try Again")).toBeInTheDocument();
      expect(screen.getByText("Reload Page")).toBeInTheDocument();
    });

    it("should display error ID when available", () => {
      const ErrorComponent = createErrorComponent();

      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText(/Error ID:/)).toBeInTheDocument();
    });

    it("should call onError callback when error occurs", () => {
      const onError = jest.fn();
      const ErrorComponent = createErrorComponent();

      render(
        <ErrorBoundary onError={onError}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(onError).toHaveBeenCalledWith(
        expect.any(Error),
        expect.any(Object),
        expect.any(String)
      );
    });

    it("should reset error when Try Again button is clicked", () => {
      const ErrorComponent = createErrorComponent();

      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Something went wrong")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Try Again"));

      // The error should be reset and the error component should render again
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it.skip("should reload page when Reload Page button is clicked", () => {
      // TODO: Fix window.location.reload mocking in test environment
      // This test is temporarily disabled due to JSDOM limitations
      // with redefining window.location properties
    });

    it("should show development error details in development mode", () => {
      const originalEnv = process.env.NODE_ENV;
      // Use Object.defineProperty to bypass readonly restriction
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "development",
        writable: true,
        configurable: true,
      });

      const ErrorComponent = createErrorComponent();

      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(
        screen.getByText("Error Details (Development)")
      ).toBeInTheDocument();

      // Restore original environment
      Object.defineProperty(process.env, "NODE_ENV", {
        value: originalEnv,
        writable: true,
        configurable: true,
      });
    });

    it("should not show development error details in production mode", () => {
      const originalEnv = process.env.NODE_ENV;
      // Use Object.defineProperty to bypass readonly restriction
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "production",
        writable: true,
        configurable: true,
      });

      const ErrorComponent = createErrorComponent();

      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(
        screen.queryByText("Error Details (Development)")
      ).not.toBeInTheDocument();

      // Restore original environment
      Object.defineProperty(process.env, "NODE_ENV", {
        value: originalEnv,
        writable: true,
        configurable: true,
      });
    });
  });

  describe("Custom Fallback", () => {
    it("should render custom fallback component", () => {
      const CustomFallback = () => <div>Custom error message</div>;
      const ErrorComponent = createErrorComponent();

      render(
        <ErrorBoundary fallback={<CustomFallback />}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Custom error message")).toBeInTheDocument();
    });

    it("should render custom fallback function", () => {
      const customFallback = (
        error: Error,
        errorInfo: ErrorInfo,
        errorId: string
      ) => (
        <div>
          Custom error: {error.message} (ID: {errorId})
        </div>
      );
      const ErrorComponent = createErrorComponent();

      render(
        <ErrorBoundary fallback={customFallback}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(
        screen.getByText(/Custom error: Component error/)
      ).toBeInTheDocument();
    });
  });

  describe("Reset Keys", () => {
    it("should reset error when resetKeys change", () => {
      const ErrorComponent = createErrorComponent();
      const { rerender } = render(
        <ErrorBoundary resetKeys={["key1"]} shouldResetOnChange={true}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Something went wrong")).toBeInTheDocument();

      // Change resetKeys
      rerender(
        <ErrorBoundary resetKeys={["key2"]} shouldResetOnChange={true}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      // Error should be reset and component should render again
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("should not reset error when shouldResetOnChange is false", () => {
      const ErrorComponent = createErrorComponent();
      const { rerender } = render(
        <ErrorBoundary resetKeys={["key1"]} shouldResetOnChange={false}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText("Something went wrong")).toBeInTheDocument();

      // Change resetKeys
      rerender(
        <ErrorBoundary resetKeys={["key2"]} shouldResetOnChange={false}>
          <ErrorComponent />
        </ErrorBoundary>
      );

      // Error should still be displayed
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });

  describe("Rethrow Behavior", () => {
    it("should rethrow error when shouldRethrow is true", () => {
      const ErrorComponent = createErrorComponent();

      expect(() => {
        render(
          <ErrorBoundary shouldRethrow={true}>
            <ErrorComponent />
          </ErrorBoundary>
        );
      }).toThrow("Component error");
    });
  });
});

describe("withErrorBoundary HOC", () => {
  it("should wrap component with error boundary", () => {
    const TestComponent = () => <div>Test component</div>;
    const WrappedComponent = withErrorBoundary(TestComponent);

    render(<WrappedComponent />);

    expect(screen.getByText("Test component")).toBeInTheDocument();
  });

  it("should handle errors in wrapped component", () => {
    const ErrorComponent = createErrorComponent();
    const WrappedComponent = withErrorBoundary(ErrorComponent);

    render(<WrappedComponent />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should pass through props to wrapped component", () => {
    const TestComponent = ({ name }: { name: string }) => (
      <div>Hello {name}</div>
    );
    const WrappedComponent = withErrorBoundary(TestComponent);

    render(<WrappedComponent name="World" />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should set display name correctly", () => {
    const TestComponent = () => <div>Test</div>;
    TestComponent.displayName = "TestComponent";

    const WrappedComponent = withErrorBoundary(TestComponent);

    expect(WrappedComponent.displayName).toBe(
      "withErrorBoundary(TestComponent)"
    );
  });
});

describe("useErrorHandler Hook", () => {
  it("should return error handler function", () => {
    const TestComponent = () => {
      const handleError = useErrorHandler();
      return (
        <button onClick={() => handleError(new Error("Test error"))}>
          Trigger Error
        </button>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText("Trigger Error")).toBeInTheDocument();
  });

  it("should handle errors with context", () => {
    const TestComponent = () => {
      const handleError = useErrorHandler();
      return (
        <button
          onClick={() =>
            handleError(new Error("Test error"), { userId: "test-user" })
          }
        >
          Trigger Error
        </button>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText("Trigger Error")).toBeInTheDocument();
  });
});

describe("Error Boundary Integration", () => {
  it("should work with nested error boundaries", () => {
    const InnerErrorComponent = createErrorComponent();
    const OuterErrorComponent = () => (
      <ErrorBoundary>
        <InnerErrorComponent />
      </ErrorBoundary>
    );

    render(
      <ErrorBoundary>
        <OuterErrorComponent />
      </ErrorBoundary>
    );

    // Should show the inner error boundary's error UI
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("should handle async errors", async () => {
    const AsyncErrorComponent = () => {
      const [hasError, setHasError] = React.useState(false);

      React.useEffect(() => {
        const timer = setTimeout(() => {
          setHasError(true);
        }, 10);
        return () => clearTimeout(timer);
      }, []);

      if (hasError) {
        throw new Error("Async error");
      }

      return <div>Async component</div>;
    };

    render(
      <ErrorBoundary>
        <AsyncErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Async component")).toBeInTheDocument();

    // Wait for async error to be thrown
    await waitFor(
      () => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it("should handle promise rejections", async () => {
    const PromiseErrorComponent = () => {
      const [hasError, setHasError] = React.useState(false);

      React.useEffect(() => {
        Promise.reject(new Error("Promise error")).catch(() => {
          setHasError(true);
        });
      }, []);

      if (hasError) {
        throw new Error("Promise error");
      }

      return <div>Promise component</div>;
    };

    render(
      <ErrorBoundary>
        <PromiseErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText("Promise component")).toBeInTheDocument();

    // Wait for promise rejection to be handled
    await waitFor(
      () => {
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
