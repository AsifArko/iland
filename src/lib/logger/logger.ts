/**
 * Centralized Logger Implementation
 *
 * This module provides a comprehensive logging system with multiple output handlers
 * and structured logging capabilities.
 */

import {
  LogEntry,
  LogLevelName,
  LogContext,
  LoggerConfig,
  Logger,
  LOG_LEVELS,
} from "./types";

class LoggerImpl implements Logger {
  private config: LoggerConfig;
  private requestId?: string;

  constructor(config: LoggerConfig) {
    this.config = config;
  }

  setRequestId(requestId: string): void {
    this.requestId = requestId;
  }

  private shouldLog(level: LogLevelName): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.level];
  }

  private createLogEntry(
    level: LogLevelName,
    message: string,
    error?: Error,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: {
        ...context,
        requestId: this.requestId || context?.requestId,
      },
      metadata,
    };

    if (error) {
      entry.error = error;
    }

    return entry;
  }

  private formatLogEntry(entry: LogEntry): string {
    if (this.config.format === "json") {
      return JSON.stringify(entry, null, 2);
    }

    // Text format
    let formatted = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;

    if (entry.context?.requestId) {
      formatted += ` [RequestId: ${entry.context.requestId}]`;
    }

    if (entry.context?.userId) {
      formatted += ` [UserId: ${entry.context.userId}]`;
    }

    if (entry.error && this.config.includeStackTraces) {
      formatted += `\nError: ${entry.error.message}\nStack: ${entry.error.stack}`;
    }

    if (entry.metadata && Object.keys(entry.metadata).length > 0) {
      formatted += `\nMetadata: ${JSON.stringify(entry.metadata, null, 2)}`;
    }

    return formatted;
  }

  private async writeToConsole(entry: LogEntry): Promise<void> {
    if (!this.config.enableConsole) return;

    const formatted = this.formatLogEntry(entry);

    switch (entry.level) {
      case "DEBUG":
        console.debug(formatted);
        break;
      case "INFO":
        console.info(formatted);
        break;
      case "WARN":
        console.warn(formatted);
        break;
      case "ERROR":
      case "CRITICAL":
        console.error(formatted);
        break;
    }
  }

  private async writeToFile(entry: LogEntry): Promise<void> {
    if (!this.config.enableFile || !this.config.filePath) return;

    // Only enable file logging on server side
    if (typeof window !== "undefined") return;

    // Skip file logging in browser environment or Edge Runtime
    if (typeof window !== "undefined" || typeof process === "undefined") {
      return;
    }

    // Skip file logging in Edge Runtime
    if (process.env.NEXT_RUNTIME === "edge") {
      return;
    }

    try {
      const formatted = this.formatLogEntry(entry);
      // Use dynamic import with a try-catch to handle module resolution
      try {
        const fs = await import("fs/promises");
        await fs.appendFile(this.config.filePath, formatted + "\n");
      } catch (importError) {
        // If fs/promises is not available, just log to console
        console.warn("File logging not available:", importError);
        await this.writeToConsole(entry);
      }
    } catch (error) {
      // Fallback to console if file writing fails
      console.error("Failed to write to log file:", error);
      await this.writeToConsole(entry);
    }
  }

  private async writeToRemote(entry: LogEntry): Promise<void> {
    if (!this.config.enableRemote || !this.config.remoteEndpoint) return;

    try {
      const response = await fetch(this.config.remoteEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error(
          `Remote logging failed: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      // Fallback to console if remote logging fails
      console.error("Failed to send log to remote endpoint:", error);
      await this.writeToConsole(entry);
    }
  }

  private async writeLog(entry: LogEntry): Promise<void> {
    if (!this.shouldLog(entry.level)) return;

    // Write to all configured outputs in parallel
    await Promise.allSettled([
      this.writeToConsole(entry),
      this.writeToFile(entry),
      this.writeToRemote(entry),
    ]);
  }

  debug(
    message: string,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void {
    const entry = this.createLogEntry(
      "DEBUG",
      message,
      undefined,
      context,
      metadata
    );
    this.writeLog(entry).catch(console.error);
  }

  info(
    message: string,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void {
    const entry = this.createLogEntry(
      "INFO",
      message,
      undefined,
      context,
      metadata
    );
    this.writeLog(entry).catch(console.error);
  }

  warn(
    message: string,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void {
    const entry = this.createLogEntry(
      "WARN",
      message,
      undefined,
      context,
      metadata
    );
    this.writeLog(entry).catch(console.error);
  }

  error(
    message: string,
    error?: Error,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void {
    const entry = this.createLogEntry(
      "ERROR",
      message,
      error,
      context,
      metadata
    );
    this.writeLog(entry).catch(console.error);
  }

  critical(
    message: string,
    error?: Error,
    context?: LogContext,
    metadata?: Record<string, unknown>
  ): void {
    const entry = this.createLogEntry(
      "CRITICAL",
      message,
      error,
      context,
      metadata
    );
    this.writeLog(entry).catch(console.error);
  }
}

// Default configuration
const defaultConfig: LoggerConfig = {
  level: (process.env.LOG_LEVEL as LogLevelName) || "INFO",
  enableConsole: true,
  enableFile: process.env.NODE_ENV === "production",
  enableRemote: false,
  filePath: process.env.LOG_FILE_PATH,
  remoteEndpoint: process.env.LOG_REMOTE_ENDPOINT,
  format: (process.env.LOG_FORMAT as "json" | "text") || "json",
  includeStackTraces: true,
  includeRequestInfo: true,
};

// Create singleton logger instance
export const logger = new LoggerImpl(defaultConfig);

// Export logger instance and types
export { LoggerImpl, type Logger, type LoggerConfig, type LogContext };
