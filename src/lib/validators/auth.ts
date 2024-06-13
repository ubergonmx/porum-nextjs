// import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const signupSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, {
      message: "First name must be at least 1 character",
    })
    .max(255, {
      message: "First name must not be more than 255 characters long",
    }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .trim()
    .min(1, {
      message: "First name must be at least 1 character",
    })
    .max(255, {
      message: "Last name must not be more than 255 characters long",
    }),
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(255, {
      message: "Username must not be more than 255 characters long",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, {
      message: "Email must be at least 3 characters",
    })
    .max(255, { message: "Email must not be more than 255 characters long" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  phone: z
    .string()
    // .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, {
      message: "Invalid phone number",
    }),
});

export type SignupInput = z.infer<typeof signupSchema>;
