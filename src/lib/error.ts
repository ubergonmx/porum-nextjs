// lib/errors.ts

import { FormErrorOptions } from "@/lib/types";

export class FormError<T> extends Error {
  readonly name: string;
  readonly userMessage?: string;
  readonly fieldError?: Partial<Record<keyof T, string | undefined>>;
  readonly details?: string;

  constructor(name: string, message: string, options: FormErrorOptions<T>) {
    super(message);
    this.name = name;
    if (options.userMessage) this.userMessage = options.userMessage;
    if (options.fieldError) this.fieldError = options.fieldError;
    if (options.details) this.details = options.details;
  }
}

export class UnauthorizedError extends Error {
  readonly name = "UnauthorizedError";
  readonly details?: string;

  constructor(details?: string) {
    super("Unauthorized");
    if (details) this.message = details;
  }
}

export const formErrorStringify = (error: FormError<unknown>) =>
  JSON.stringify(
    {
      type: error.name,
      message: error.message,
      userMessage: error.userMessage,
      details: error.details,
      stack: error.stack,
      fieldErrors: error.fieldError,
    },
    null,
    2,
  );

export const unauthorizedErrorStringify = (error: UnauthorizedError) =>
  JSON.stringify(
    {
      type: error.name,
      message: error.message,
      details: error.details,
      stack: error.stack,
    },
    null,
    2,
  );

export const unknownErrorStringify = (error: Error) =>
  JSON.stringify(
    {
      type: error.name || "UnknownError",
      message: error.message,
      stack: error.stack,
    },
    null,
    2,
  );
