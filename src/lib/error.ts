// lib/errors.ts

import { FormErrorOptions } from "@/lib/types";
import { LoginInput, SignupInput } from "@/lib/validators/auth";

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

export function isLoginError(error: unknown): error is FormError<LoginInput> {
  return error instanceof FormError && error.name === "LoginError";
}

export function isSignupError(error: unknown): error is FormError<SignupInput> {
  return error instanceof FormError && error.name === "SignupError";
}
