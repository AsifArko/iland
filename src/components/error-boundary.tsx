/**
 * React Error Boundary Component
 *
 * This component provides comprehensive error handling for React components,
 * including error logging, user-friendly error messages, and recovery mechanisms.
 */

"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { clientLogger as logger } from "@/lib/logger/client-logger";
import { createErrorContext, SystemError } from "@/lib/errors";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?:
    | ReactNode
    | ((error: Error, errorInfo: ErrorInfo, errorId: string) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
  resetKeys?: unknown[];
  shouldRethrow?: boolean;
  shouldResetOnChange?: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: crypto.randomUUID(),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const errorId = this.state.errorId || crypto.randomUUID();

    // Log the error with comprehensive context
    const context = createErrorContext();
    const systemError = new SystemError(
      `React component error: ${error.message}`,
      { ...context, requestId: errorId }
    );

    logger.error(
      `React Error Boundary caught error: ${error.message}`,
      systemError,
      {
        ...context,
        requestId: errorId,
        componentStack: errorInfo.componentStack,
        errorName: error.name,
        errorStack: error.stack,
      },
      {
        errorBoundary: true,
        componentStack: errorInfo.componentStack,
        originalError: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      }
    );

    // Call custom error handler if provided
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo, errorId);
      } catch (handlerError) {
        logger.error(
          "Error in error boundary onError handler",
          handlerError as Error
        );
      }
    }

    // Update state with error info
    this.setState({
      error,
      errorInfo,
      errorId,
    });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { resetKeys, shouldResetOnChange } = this.props;

    if (shouldResetOnChange && resetKeys && this.state.hasError) {
      const keysChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index]
      );

      if (keysChanged) {
        this.resetError();
      }
    }
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: undefined,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo, errorId } = this.state;
    const { children, fallback, shouldRethrow } = this.props;

    if (hasError) {
      // Rethrow if configured to do so
      if (shouldRethrow && error) {
        throw error;
      }

      // Use custom fallback if provided
      if (fallback) {
        if (typeof fallback === "function" && error && errorInfo && errorId) {
          return fallback(error, errorInfo, errorId);
        }
        return fallback as ReactNode;
      }

      // Default error UI
      return this.renderDefaultErrorUI(error, errorInfo, errorId);
    }

    return children;
  }

  private renderDefaultErrorUI(
    error?: Error,
    errorInfo?: ErrorInfo,
    errorId?: string
  ): ReactNode {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-red-500">
              <svg
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We&apos;re sorry, but something unexpected happened. Our team has
              been notified.
            </p>
            {errorId && (
              <p className="mt-2 text-xs text-gray-500">Error ID: {errorId}</p>
            )}
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={this.resetError}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Try Again
            </button>

            <button
              onClick={() => window.location.reload()}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reload Page
            </button>
          </div>

          {process.env.NODE_ENV === "development" && error && (
            <details className="mt-8 text-left">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                Error Details (Development)
              </summary>
              <div className="mt-2 p-4 bg-gray-100 rounded-md text-xs font-mono text-gray-800 overflow-auto max-h-64">
                <div className="mb-2">
                  <strong>Error:</strong> {error.message}
                </div>
                {error.stack && (
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap">{error.stack}</pre>
                  </div>
                )}
                {errorInfo?.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="whitespace-pre-wrap">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }
}

// Higher-order component for easier error boundary usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, "children">
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Hook for functional components to handle errors
export function useErrorHandler() {
  const handleError = React.useCallback(
    (error: Error, context?: Record<string, unknown>) => {
      const errorContext = createErrorContext();
      const systemError = new SystemError(
        `Functional component error: ${error.message}`,
        { ...errorContext, ...context }
      );

      logger.error(
        `Functional component error: ${error.message}`,
        systemError,
        { ...errorContext, ...context },
        {
          hook: "useErrorHandler",
          originalError: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        }
      );
    },
    []
  );

  return handleError;
}
