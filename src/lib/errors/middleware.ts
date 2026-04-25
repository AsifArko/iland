/**
 * Error Handling Middleware for API Routes
 *
 * This module provides middleware functions for handling errors in Next.js API routes
 * with proper logging, error transformation, and response formatting.
 */

import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import {
  BaseError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  DatabaseError,
  ExternalServiceError,
  NetworkError,
  SystemError,
  createErrorContext,
  isRetryableError,
  getErrorSeverity,
  type ApiErrorResponse,
  type ErrorContext,
} from "./types";

export interface ErrorHandlerOptions {
  logErrors?: boolean;
  includeStackTraces?: boolean;
  transformErrors?: boolean;
  defaultErrorMessage?: string;
}

const defaultOptions: ErrorHandlerOptions = {
  logErrors: true,
  includeStackTraces: process.env.NODE_ENV === "development",
  transformErrors: true,
  defaultErrorMessage: "An unexpected error occurred",
};

/**
 * Wraps an API route handler with comprehensive error handling
 */
export function withErrorHandler<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  options: ErrorHandlerOptions = {}
) {
  const config = { ...defaultOptions, ...options };

  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    const startTime = Date.now();
    const requestId = crypto.randomUUID();
    const context = createErrorContext(request);

    // Set request ID in logger
    logger.setRequestId(requestId);

    try {
      // Log request start
      logger.info("API request started", {
        ...context,
        requestId,
        method: request.method,
        url: request.url,
      });

      // Execute the handler
      const response = await handler(request, ...args);

      // Log successful response
      const duration = Date.now() - startTime;
      logger.info("API request completed", {
        ...context,
        requestId,
        status: response.status,
        duration,
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorResponse = await handleApiError(
        error as Error,
        request,
        context,
        requestId,
        duration,
        config
      );

      return errorResponse;
    }
  };
}

/**
 * Handles errors in API routes and returns appropriate responses
 */
export async function handleApiError(
  error: Error,
  request: NextRequest,
  context: unknown,
  requestId: string,
  duration: number,
  options: ErrorHandlerOptions = defaultOptions
): Promise<NextResponse> {
  // Transform error if needed
  const transformedError = options.transformErrors
    ? transformError(error, request, context)
    : error;

  // Log the error
  if (options.logErrors) {
    await logApiError(transformedError, request, context, requestId, duration);
  }

  // Create error response
  const errorResponse = createErrorResponse(
    transformedError,
    requestId,
    options
  );

  // Return appropriate HTTP response
  return NextResponse.json(errorResponse, {
    status: getHttpStatus(transformedError),
    headers: {
      "X-Request-ID": requestId,
      "Content-Type": "application/json",
    },
  });
}

/**
 * Transforms generic errors into typed application errors
 */
function transformError(
  error: Error,
  request: NextRequest,
  context: unknown
): BaseError {
  // If it's already a BaseError, return it
  if (error instanceof BaseError) {
    return error;
  }

  // Transform based on error characteristics
  const errorMessage = error.message.toLowerCase();
  const errorName = error.name.toLowerCase();

  // Cast context to ErrorContext for error constructors
  const errorContext = context as ErrorContext;

  // Validation errors
  if (errorName.includes("validation") || errorMessage.includes("validation")) {
    return new ValidationError(error.message, errorContext, error);
  }

  // Authentication errors
  if (
    errorName.includes("auth") ||
    errorMessage.includes("unauthorized") ||
    errorMessage.includes("token")
  ) {
    return new AuthenticationError(error.message, errorContext, error);
  }

  // Authorization errors
  if (errorName.includes("permission") || errorMessage.includes("forbidden")) {
    return new AuthorizationError(error.message, errorContext, error);
  }

  // Database errors
  if (
    errorName.includes("database") ||
    errorName.includes("connection") ||
    errorMessage.includes("database")
  ) {
    return new DatabaseError(error.message, errorContext, error);
  }

  // Network errors
  if (
    errorName.includes("network") ||
    errorName.includes("timeout") ||
    errorMessage.includes("fetch")
  ) {
    return new NetworkError(error.message, errorContext, error);
  }

  // External service errors
  if (
    errorName.includes("stripe") ||
    errorName.includes("email") ||
    errorName.includes("sanity")
  ) {
    return new ExternalServiceError(
      "External Service",
      error.message,
      errorContext,
      error
    );
  }

  // Default to system error
  return new SystemError(error.message, errorContext, error);
}

/**
 * Logs API errors with comprehensive context
 */
async function logApiError(
  error: Error,
  request: NextRequest,
  context: unknown,
  requestId: string,
  duration: number
): Promise<void> {
  const severity = getErrorSeverity(error);
  const isRetryable = isRetryableError(error);
  const errorContext = {
    ...(context as Record<string, unknown>),
    requestId,
    duration,
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
  };

  const metadata = {
    api: true,
    retryable: isRetryable,
    severity,
    originalError: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
  };

  if (severity === "critical") {
    logger.critical(
      `API Critical Error: ${error.message}`,
      error,
      errorContext,
      metadata
    );
  } else {
    logger.error(`API Error: ${error.message}`, error, errorContext, metadata);
  }
}

/**
 * Creates a standardized error response
 */
function createErrorResponse(
  error: Error,
  requestId: string,
  options: ErrorHandlerOptions
): ApiErrorResponse {
  const baseResponse = {
    error: {
      code: error instanceof BaseError ? error.code : "UNKNOWN_ERROR",
      message:
        error.message ||
        options.defaultErrorMessage ||
        "An unexpected error occurred",
      timestamp: new Date().toISOString(),
      requestId,
    },
  };

  // Add stack trace in development
  if (options.includeStackTraces && error.stack) {
    (baseResponse.error as Record<string, unknown>).stack = error.stack;
  }

  // Add additional details for BaseError instances
  if (error instanceof BaseError) {
    (baseResponse.error as Record<string, unknown>).severity = error.severity;
    (baseResponse.error as Record<string, unknown>).category = error.category;
    (baseResponse.error as Record<string, unknown>).retryable = error.retryable;
  }

  return baseResponse;
}

/**
 * Maps error types to appropriate HTTP status codes
 */
function getHttpStatus(error: Error): number {
  if (error instanceof BaseError) {
    switch (error.category) {
      case "validation":
        return 400;
      case "authentication":
        return 401;
      case "authorization":
        return 403;
      case "database":
        return 500;
      case "external":
        return 502;
      case "network":
        return 503;
      case "system":
        return 500;
      default:
        return 500;
    }
  }

  // Default status codes for common error names
  const errorName = error.name.toLowerCase();
  if (errorName.includes("validation")) return 400;
  if (errorName.includes("unauthorized")) return 401;
  if (errorName.includes("forbidden")) return 403;
  if (errorName.includes("not found")) return 404;
  if (errorName.includes("timeout")) return 408;
  if (errorName.includes("rate limit")) return 429;

  return 500;
}

/**
 * Utility function to create a simple error handler for async functions
 */
export function createErrorHandler(options: ErrorHandlerOptions = {}) {
  return async function errorHandler(
    error: Error,
    request: NextRequest
  ): Promise<NextResponse> {
    const requestId = crypto.randomUUID();
    const context = createErrorContext(request);

    return await handleApiError(error, request, context, requestId, 0, options);
  };
}

/**
 * Middleware for handling unhandled promise rejections
 */
export function setupUnhandledRejectionHandler(): void {
  process.on("unhandledRejection", (reason, promise) => {
    const error = reason instanceof Error ? reason : new Error(String(reason));
    const context = createErrorContext();

    logger.critical("Unhandled Promise Rejection", error, context, {
      unhandledRejection: true,
      promise: promise.toString(),
    });
  });
}

/**
 * Middleware for handling uncaught exceptions
 */
export function setupUncaughtExceptionHandler(): void {
  process.on("uncaughtException", error => {
    const context = createErrorContext();

    logger.critical("Uncaught Exception", error, context, {
      uncaughtException: true,
    });

    // Exit process after logging
    process.exit(1);
  });
}
