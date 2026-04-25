/**
 * Error Types for iLand Application
 *
 * This module defines all error types and interfaces used throughout the application.
 * Each error type has specific properties and methods for proper error handling.
 */

export interface ErrorContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  timestamp: string;
  userAgent?: string | null;
  ip?: string | null;
  url?: string;
  method?: string;
  [key: string]: unknown;
}

export interface ErrorMetadata {
  code: string;
  severity: "low" | "medium" | "high" | "critical";
  category:
    | "validation"
    | "authentication"
    | "authorization"
    | "database"
    | "external"
    | "system"
    | "network";
  retryable: boolean;
  context?: ErrorContext;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
    timestamp: string;
    requestId?: string;
  };
}

// Base error class for all application errors
export abstract class BaseError extends Error {
  public readonly code: string;
  public readonly severity: "low" | "medium" | "high" | "critical";
  public readonly category:
    | "validation"
    | "authentication"
    | "authorization"
    | "database"
    | "external"
    | "system"
    | "network";
  public readonly retryable: boolean;
  public readonly context?: ErrorContext;
  public readonly originalError?: Error;

  constructor(message: string, metadata: ErrorMetadata, originalError?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.code = metadata.code;
    this.severity = metadata.severity;
    this.category = metadata.category;
    this.retryable = metadata.retryable;
    this.context = metadata.context;
    this.originalError = originalError;

    // Ensure proper stack trace
    if (originalError?.stack) {
      this.stack = `${this.stack}\nCaused by: ${originalError.stack}`;
    }
  }

  public toJSON(): ApiErrorResponse {
    return {
      error: {
        code: this.code,
        message: this.message,
        timestamp: new Date().toISOString(),
        requestId: this.context?.requestId,
      },
    };
  }
}

// Validation Errors
export class ValidationError extends BaseError {
  constructor(message: string, context?: ErrorContext, originalError?: Error) {
    super(
      message,
      {
        code: "VALIDATION_ERROR",
        severity: "low",
        category: "validation",
        retryable: false,
        context,
      },
      originalError
    );
  }
}

export class RequiredFieldError extends ValidationError {
  constructor(fieldName: string, context?: ErrorContext) {
    super(`Required field '${fieldName}' is missing`, context);
    (this as Record<string, unknown>).code = "REQUIRED_FIELD_ERROR";
  }
}

export class InvalidFormatError extends ValidationError {
  constructor(
    fieldName: string,
    expectedFormat: string,
    context?: ErrorContext
  ) {
    super(
      `Field '${fieldName}' has invalid format. Expected: ${expectedFormat}`,
      context
    );
    (this as Record<string, unknown>).code = "INVALID_FORMAT_ERROR";
  }
}

// Authentication Errors
export class AuthenticationError extends BaseError {
  constructor(message: string, context?: ErrorContext, originalError?: Error) {
    super(
      message,
      {
        code: "AUTHENTICATION_ERROR",
        severity: "high",
        category: "authentication",
        retryable: false,
        context,
      },
      originalError
    );
  }
}

export class InvalidTokenError extends AuthenticationError {
  constructor(context?: ErrorContext) {
    super("Invalid or expired token", context);
    (this as Record<string, unknown>).code = "INVALID_TOKEN_ERROR";
  }
}

export class MissingCredentialsError extends AuthenticationError {
  constructor(context?: ErrorContext) {
    super("Missing required credentials", context);
    (this as Record<string, unknown>).code = "MISSING_CREDENTIALS_ERROR";
  }
}

// Authorization Errors
export class AuthorizationError extends BaseError {
  constructor(message: string, context?: ErrorContext, originalError?: Error) {
    super(
      message,
      {
        code: "AUTHORIZATION_ERROR",
        severity: "high",
        category: "authorization",
        retryable: false,
        context,
      },
      originalError
    );
  }
}

export class InsufficientPermissionsError extends AuthorizationError {
  constructor(requiredPermission: string, context?: ErrorContext) {
    super(`Insufficient permissions. Required: ${requiredPermission}`, context);
    (this as Record<string, unknown>).code = "INSUFFICIENT_PERMISSIONS_ERROR";
  }
}

// Database Errors
export class DatabaseError extends BaseError {
  constructor(message: string, context?: ErrorContext, originalError?: Error) {
    super(
      message,
      {
        code: "DATABASE_ERROR",
        severity: "high",
        category: "database",
        retryable: true,
        context,
      },
      originalError
    );
  }
}

export class ConnectionError extends DatabaseError {
  constructor(context?: ErrorContext, originalError?: Error) {
    super("Database connection failed", context, originalError);
    (this as Record<string, unknown>).code = "DATABASE_CONNECTION_ERROR";
  }
}

export class QueryError extends DatabaseError {
  constructor(query: string, context?: ErrorContext, originalError?: Error) {
    super(`Database query failed: ${query}`, context, originalError);
    (this as Record<string, unknown>).code = "DATABASE_QUERY_ERROR";
  }
}

// External Service Errors
export class ExternalServiceError extends BaseError {
  constructor(
    serviceName: string,
    message: string,
    context?: ErrorContext,
    originalError?: Error
  ) {
    super(
      `External service '${serviceName}' error: ${message}`,
      {
        code: "EXTERNAL_SERVICE_ERROR",
        severity: "medium",
        category: "external",
        retryable: true,
        context,
      },
      originalError
    );
  }
}

export class StripeError extends ExternalServiceError {
  constructor(message: string, context?: ErrorContext, originalError?: Error) {
    super("Stripe", message, context, originalError);
    (this as Record<string, unknown>).code = "STRIPE_ERROR";
  }
}

export class EmailServiceError extends ExternalServiceError {
  constructor(message: string, context?: ErrorContext, originalError?: Error) {
    super("Email Service", message, context, originalError);
    (this as Record<string, unknown>).code = "EMAIL_SERVICE_ERROR";
  }
}

export class SanityError extends ExternalServiceError {
  constructor(message: string, context?: ErrorContext, originalError?: Error) {
    super("Sanity CMS", message, context, originalError);
    (this as Record<string, unknown>).code = "SANITY_ERROR";
  }
}

// Network Errors
export class NetworkError extends BaseError {
  constructor(message: string, context?: ErrorContext, originalError?: Error) {
    super(
      message,
      {
        code: "NETWORK_ERROR",
        severity: "medium",
        category: "network",
        retryable: true,
        context,
      },
      originalError
    );
  }
}

export class TimeoutError extends NetworkError {
  constructor(timeout: number, context?: ErrorContext) {
    super(`Request timed out after ${timeout}ms`, context);
    (this as Record<string, unknown>).code = "TIMEOUT_ERROR";
  }
}

export class RateLimitError extends NetworkError {
  constructor(service: string, context?: ErrorContext) {
    super(`Rate limit exceeded for ${service}`, context);
    (this as Record<string, unknown>).code = "RATE_LIMIT_ERROR";
  }
}

// System Errors
export class SystemError extends BaseError {
  constructor(message: string, context?: ErrorContext, originalError?: Error) {
    super(
      message,
      {
        code: "SYSTEM_ERROR",
        severity: "critical",
        category: "system",
        retryable: false,
        context,
      },
      originalError
    );
  }
}

export class ConfigurationError extends SystemError {
  constructor(missingConfig: string, context?: ErrorContext) {
    super(`Missing configuration: ${missingConfig}`, context);
    (this as Record<string, unknown>).code = "CONFIGURATION_ERROR";
  }
}

export class EnvironmentError extends SystemError {
  constructor(missingEnvVar: string, context?: ErrorContext) {
    super(`Missing environment variable: ${missingEnvVar}`, context);
    (this as Record<string, unknown>).code = "ENVIRONMENT_ERROR";
  }
}

// Utility function to create error context
export function createErrorContext(
  request?: Request,
  userId?: string,
  sessionId?: string
): ErrorContext {
  return {
    userId,
    sessionId,
    requestId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    userAgent: request?.headers.get("user-agent"),
    ip:
      request?.headers.get("x-forwarded-for") ||
      request?.headers.get("x-real-ip"),
    url: request?.url,
    method: request?.method,
  };
}

// Utility function to determine if error is retryable
export function isRetryableError(error: Error): boolean {
  if (error instanceof BaseError) {
    return error.retryable;
  }

  // Default retryable errors
  const retryableErrorNames = [
    "NetworkError",
    "TimeoutError",
    "ConnectionError",
    "RateLimitError",
  ];

  return retryableErrorNames.includes(error.name);
}

// Utility function to get error severity
export function getErrorSeverity(
  error: Error
): "low" | "medium" | "high" | "critical" {
  if (error instanceof BaseError) {
    return error.severity;
  }

  // Default severity mapping
  if (error.name.includes("Validation")) return "low";
  if (error.name.includes("Network") || error.name.includes("Timeout"))
    return "medium";
  if (error.name.includes("Auth") || error.name.includes("Database"))
    return "high";
  return "critical";
}
