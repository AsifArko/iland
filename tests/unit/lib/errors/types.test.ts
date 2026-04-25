import {
  BaseError,
  ValidationError,
  RequiredFieldError,
  InvalidFormatError,
  AuthenticationError,
  InvalidTokenError,
  MissingCredentialsError,
  AuthorizationError,
  InsufficientPermissionsError,
  DatabaseError,
  ConnectionError,
  QueryError,
  ExternalServiceError,
  StripeError,
  EmailServiceError,
  SanityError,
  NetworkError,
  TimeoutError,
  RateLimitError,
  SystemError,
  ConfigurationError,
  EnvironmentError,
  createErrorContext,
  isRetryableError,
  getErrorSeverity,
} from "@/lib/errors";

describe("Error Types", () => {
  describe("BaseError", () => {
    it("should create a base error with all properties", () => {
      const context = {
        userId: "test-user",
        requestId: "test-request",
        timestamp: new Date().toISOString(),
      };
      const originalError = new Error("Original error");

      const error = new ValidationError("Test error", context, originalError);

      expect(error).toBeInstanceOf(BaseError);
      expect(error.message).toBe("Test error");
      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.severity).toBe("low");
      expect(error.category).toBe("validation");
      expect(error.retryable).toBe(false);
      expect(error.context).toEqual(context);
      expect(error.originalError).toBe(originalError);
    });

    it("should generate proper stack trace with original error", () => {
      const originalError = new Error("Original error");
      const error = new ValidationError("Test error", undefined, originalError);

      expect(error.stack).toContain("Test error");
      expect(error.stack).toContain("Caused by:");
      expect(error.stack).toContain("Original error");
    });

    it("should convert to JSON format", () => {
      const context = {
        requestId: "test-request",
        timestamp: new Date().toISOString(),
      };
      const error = new ValidationError("Test error", context);
      const json = error.toJSON();

      expect(json.error.code).toBe("VALIDATION_ERROR");
      expect(json.error.message).toBe("Test error");
      expect(json.error.timestamp).toBeDefined();
      expect(json.error.requestId).toBe("test-request");
    });
  });

  describe("ValidationError", () => {
    it("should create validation error with correct properties", () => {
      const error = new ValidationError("Validation failed");

      expect(error).toBeInstanceOf(ValidationError);
      expect(error).toBeInstanceOf(BaseError);
      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.severity).toBe("low");
      expect(error.category).toBe("validation");
      expect(error.retryable).toBe(false);
    });
  });

  describe("RequiredFieldError", () => {
    it("should create required field error with field name", () => {
      const error = new RequiredFieldError("email");

      expect(error).toBeInstanceOf(RequiredFieldError);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toBe("Required field 'email' is missing");
      expect((error as BaseError).code).toBe("REQUIRED_FIELD_ERROR");
    });
  });

  describe("InvalidFormatError", () => {
    it("should create invalid format error with field and expected format", () => {
      const error = new InvalidFormatError("email", "valid email address");

      expect(error).toBeInstanceOf(InvalidFormatError);
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.message).toBe(
        "Field 'email' has invalid format. Expected: valid email address"
      );
      expect((error as BaseError).code).toBe("INVALID_FORMAT_ERROR");
    });
  });

  describe("AuthenticationError", () => {
    it("should create authentication error with correct properties", () => {
      const error = new AuthenticationError("Auth failed");

      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error).toBeInstanceOf(BaseError);
      expect(error.code).toBe("AUTHENTICATION_ERROR");
      expect(error.severity).toBe("high");
      expect(error.category).toBe("authentication");
      expect(error.retryable).toBe(false);
    });
  });

  describe("InvalidTokenError", () => {
    it("should create invalid token error", () => {
      const error = new InvalidTokenError();

      expect(error).toBeInstanceOf(InvalidTokenError);
      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.message).toBe("Invalid or expired token");
      expect((error as BaseError).code).toBe("INVALID_TOKEN_ERROR");
    });
  });

  describe("MissingCredentialsError", () => {
    it("should create missing credentials error", () => {
      const error = new MissingCredentialsError();

      expect(error).toBeInstanceOf(MissingCredentialsError);
      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.message).toBe("Missing required credentials");
      expect((error as BaseError).code).toBe("MISSING_CREDENTIALS_ERROR");
    });
  });

  describe("AuthorizationError", () => {
    it("should create authorization error with correct properties", () => {
      const error = new AuthorizationError("Access denied");

      expect(error).toBeInstanceOf(AuthorizationError);
      expect(error).toBeInstanceOf(BaseError);
      expect(error.code).toBe("AUTHORIZATION_ERROR");
      expect(error.severity).toBe("high");
      expect(error.category).toBe("authorization");
      expect(error.retryable).toBe(false);
    });
  });

  describe("InsufficientPermissionsError", () => {
    it("should create insufficient permissions error with required permission", () => {
      const error = new InsufficientPermissionsError("admin");

      expect(error).toBeInstanceOf(InsufficientPermissionsError);
      expect(error).toBeInstanceOf(AuthorizationError);
      expect(error.message).toBe("Insufficient permissions. Required: admin");
      expect((error as BaseError).code).toBe("INSUFFICIENT_PERMISSIONS_ERROR");
    });
  });

  describe("DatabaseError", () => {
    it("should create database error with correct properties", () => {
      const error = new DatabaseError("Database failed");

      expect(error).toBeInstanceOf(DatabaseError);
      expect(error).toBeInstanceOf(BaseError);
      expect(error.code).toBe("DATABASE_ERROR");
      expect(error.severity).toBe("high");
      expect(error.category).toBe("database");
      expect(error.retryable).toBe(true);
    });
  });

  describe("ConnectionError", () => {
    it("should create connection error", () => {
      const error = new ConnectionError();

      expect(error).toBeInstanceOf(ConnectionError);
      expect(error).toBeInstanceOf(DatabaseError);
      expect(error.message).toBe("Database connection failed");
      expect((error as BaseError).code).toBe("DATABASE_CONNECTION_ERROR");
    });
  });

  describe("QueryError", () => {
    it("should create query error with query string", () => {
      const error = new QueryError("SELECT * FROM users");

      expect(error).toBeInstanceOf(QueryError);
      expect(error).toBeInstanceOf(DatabaseError);
      expect(error.message).toBe("Database query failed: SELECT * FROM users");
      expect((error as BaseError).code).toBe("DATABASE_QUERY_ERROR");
    });
  });

  describe("ExternalServiceError", () => {
    it("should create external service error with service name", () => {
      const error = new ExternalServiceError("Stripe", "Payment failed");

      expect(error).toBeInstanceOf(ExternalServiceError);
      expect(error).toBeInstanceOf(BaseError);
      expect(error.message).toBe(
        "External service 'Stripe' error: Payment failed"
      );
      expect(error.code).toBe("EXTERNAL_SERVICE_ERROR");
      expect(error.severity).toBe("medium");
      expect(error.category).toBe("external");
      expect(error.retryable).toBe(true);
    });
  });

  describe("StripeError", () => {
    it("should create Stripe error", () => {
      const error = new StripeError("Payment failed");

      expect(error).toBeInstanceOf(StripeError);
      expect(error).toBeInstanceOf(ExternalServiceError);
      expect(error.message).toBe(
        "External service 'Stripe' error: Payment failed"
      );
      expect((error as BaseError).code).toBe("STRIPE_ERROR");
    });
  });

  describe("EmailServiceError", () => {
    it("should create email service error", () => {
      const error = new EmailServiceError("Email failed");

      expect(error).toBeInstanceOf(EmailServiceError);
      expect(error).toBeInstanceOf(ExternalServiceError);
      expect(error.message).toBe(
        "External service 'Email Service' error: Email failed"
      );
      expect((error as BaseError).code).toBe("EMAIL_SERVICE_ERROR");
    });
  });

  describe("SanityError", () => {
    it("should create Sanity error", () => {
      const error = new SanityError("CMS failed");

      expect(error).toBeInstanceOf(SanityError);
      expect(error).toBeInstanceOf(ExternalServiceError);
      expect(error.message).toBe(
        "External service 'Sanity CMS' error: CMS failed"
      );
      expect((error as BaseError).code).toBe("SANITY_ERROR");
    });
  });

  describe("NetworkError", () => {
    it("should create network error with correct properties", () => {
      const error = new NetworkError("Network failed");

      expect(error).toBeInstanceOf(NetworkError);
      expect(error).toBeInstanceOf(BaseError);
      expect(error.code).toBe("NETWORK_ERROR");
      expect(error.severity).toBe("medium");
      expect(error.category).toBe("network");
      expect(error.retryable).toBe(true);
    });
  });

  describe("TimeoutError", () => {
    it("should create timeout error with timeout value", () => {
      const error = new TimeoutError(5000);

      expect(error).toBeInstanceOf(TimeoutError);
      expect(error).toBeInstanceOf(NetworkError);
      expect(error.message).toBe("Request timed out after 5000ms");
      expect((error as BaseError).code).toBe("TIMEOUT_ERROR");
    });
  });

  describe("RateLimitError", () => {
    it("should create rate limit error with service name", () => {
      const error = new RateLimitError("API");

      expect(error).toBeInstanceOf(RateLimitError);
      expect(error).toBeInstanceOf(NetworkError);
      expect(error.message).toBe("Rate limit exceeded for API");
      expect((error as BaseError).code).toBe("RATE_LIMIT_ERROR");
    });
  });

  describe("SystemError", () => {
    it("should create system error with correct properties", () => {
      const error = new SystemError("System failed");

      expect(error).toBeInstanceOf(SystemError);
      expect(error).toBeInstanceOf(BaseError);
      expect(error.code).toBe("SYSTEM_ERROR");
      expect(error.severity).toBe("critical");
      expect(error.category).toBe("system");
      expect(error.retryable).toBe(false);
    });
  });

  describe("ConfigurationError", () => {
    it("should create configuration error with missing config", () => {
      const error = new ConfigurationError("DATABASE_URL");

      expect(error).toBeInstanceOf(ConfigurationError);
      expect(error).toBeInstanceOf(SystemError);
      expect(error.message).toBe("Missing configuration: DATABASE_URL");
      expect((error as BaseError).code).toBe("CONFIGURATION_ERROR");
    });
  });

  describe("EnvironmentError", () => {
    it("should create environment error with missing env var", () => {
      const error = new EnvironmentError("NODE_ENV");

      expect(error).toBeInstanceOf(EnvironmentError);
      expect(error).toBeInstanceOf(SystemError);
      expect(error.message).toBe("Missing environment variable: NODE_ENV");
      expect((error as BaseError).code).toBe("ENVIRONMENT_ERROR");
    });
  });

  describe("Utility Functions", () => {
    describe("createErrorContext", () => {
      it("should create error context with request information", () => {
        const mockRequest = new Request("http://localhost:3000/api/test", {
          method: "POST",
          headers: {
            "user-agent": "test-agent",
            "x-forwarded-for": "127.0.0.1",
          },
        });

        const context = createErrorContext(
          mockRequest,
          "test-user",
          "test-session"
        );

        expect(context.userId).toBe("test-user");
        expect(context.sessionId).toBe("test-session");
        expect(context.requestId).toBeDefined();
        expect(context.timestamp).toBeDefined();
        expect(context.userAgent).toBe("test-agent");
        expect(context.ip).toBe("127.0.0.1");
        expect(context.url).toBe("http://localhost:3000/api/test");
        expect(context.method).toBe("POST");
      });

      it("should create error context without request", () => {
        const context = createErrorContext();

        expect(context.userId).toBeUndefined();
        expect(context.sessionId).toBeUndefined();
        expect(context.requestId).toBeDefined();
        expect(context.timestamp).toBeDefined();
      });
    });

    describe("isRetryableError", () => {
      it("should return true for retryable errors", () => {
        const networkError = new NetworkError("Network failed");
        const databaseError = new DatabaseError("Database failed");
        const externalError = new ExternalServiceError("Service", "Failed");

        expect(isRetryableError(networkError)).toBe(true);
        expect(isRetryableError(databaseError)).toBe(true);
        expect(isRetryableError(externalError)).toBe(true);
      });

      it("should return false for non-retryable errors", () => {
        const validationError = new ValidationError("Validation failed");
        const authError = new AuthenticationError("Auth failed");
        const systemError = new SystemError("System failed");

        expect(isRetryableError(validationError)).toBe(false);
        expect(isRetryableError(authError)).toBe(false);
        expect(isRetryableError(systemError)).toBe(false);
      });

      it("should handle non-BaseError errors", () => {
        const regularError = new Error("Regular error");

        expect(isRetryableError(regularError)).toBe(false);
      });
    });

    describe("getErrorSeverity", () => {
      it("should return correct severity for BaseError instances", () => {
        const validationError = new ValidationError("Validation failed");
        const networkError = new NetworkError("Network failed");
        const authError = new AuthenticationError("Auth failed");
        const systemError = new SystemError("System failed");

        expect(getErrorSeverity(validationError)).toBe("low");
        expect(getErrorSeverity(networkError)).toBe("medium");
        expect(getErrorSeverity(authError)).toBe("high");
        expect(getErrorSeverity(systemError)).toBe("critical");
      });

      it("should return default severity for non-BaseError errors", () => {
        const regularError = new Error("Regular error");
        const validationRegularError = new Error("Validation failed");
        const networkRegularError = new Error("Network failed");
        const authRegularError = new Error("Authentication failed");

        expect(getErrorSeverity(regularError)).toBe("critical");
        expect(getErrorSeverity(validationRegularError)).toBe("critical");
        expect(getErrorSeverity(networkRegularError)).toBe("critical");
        expect(getErrorSeverity(authRegularError)).toBe("critical");
      });
    });
  });
});
