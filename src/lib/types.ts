export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export type FormErrorOptions<T> = {
  userMessage?: string;
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  details?: string;
};
