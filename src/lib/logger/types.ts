/**
 * Logging Types for iLand Application
 *
 * This module defines logging interfaces and types for structured logging.
 */

export interface LogLevel {
  DEBUG: 0;
  INFO: 1;
  WARN: 2;
  ERROR: 3;
  CRITICAL: 4;
}

export const LOG_LEVELS: LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  CRITICAL: 4,
};

export type LogLevelName = keyof LogLevel;
export type LogLevelValue = LogLevel[keyof LogLevel];

export interface LogContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  correlationId?: string;
  userAgent?: string | null;
  ip?: string | null;
  url?: string;
  method?: string;
  duration?: number;
  [key: string]: unknown;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevelName;
  message: string;
  context?: LogContext;
  error?: Error;
  metadata?: Record<string, unknown>;
}

export interface LoggerConfig {
  level: LogLevelName;
  enableConsole: boolean;
  enableFile: boolean;
  enableRemote: boolean;
  filePath?: string;
  remoteEndpoint?: string;
  format: "json" | "text";
  includeStackTraces: boolean;
  includeRequestInfo: boolean;
}

export interface Logger {
  debug(
    message: string,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void;
  info(
    message: string,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void;
  warn(
    message: string,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void;
  error(
    message: string,
    error?: Error,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void;
  critical(
    message: string,
    error?: Error,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void;
}
