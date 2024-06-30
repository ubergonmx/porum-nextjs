import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg"];

// const EMAIL_REGEX =
//   /^(?!\.)("([^"\r\\]|\\["\r\\])*"|([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)@[a-z0-9][\w\\.-]*[a-z0-9]\.[a-z][a-z\\.]*[a-z]$/;
const OWASP_EMAIL_REGEX =
  /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const checkEmailLength = (email: string) => {
  const [localPart, domainPart] = email.split("@");
  if (!localPart || !domainPart) return false;

  const getByteLength = (str: string | undefined) =>
    new TextEncoder().encode(str).length;

  // Check the byte length of the local part and the domain part
  return getByteLength(localPart) <= 64 && getByteLength(domainPart) <= 255;
};

export const signupSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, {
      message: "First name must be at least 1 character",
    })
    .max(255, {
      message: "First name must not be more than 255 characters long",
    })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "First name must only contain letters and spaces",
    }),
  lastName: z
    .string({ required_error: "Last name is required" })
    .trim()
    .min(1, {
      message: "Last name must be at least 1 character",
    })
    .max(255, {
      message: "Last name must not be more than 255 characters long",
    })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "First name must only contain letters and spaces",
    }),
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(255, {
      message: "Username must not be more than 255 characters long",
    })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Username must only contain letters and numbers",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, {
      message: "Email must be at least 3 characters",
    })
    .regex(OWASP_EMAIL_REGEX, {
      message: "Invalid email address",
    })
    .refine(checkEmailLength, {
      message: "Local part and domain part must be 64 and 255 bytes or less",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  // .regex(/^(09|\+639)\d{9}$/, {
  //   message: "Invalid phone number",
  // }),
  avatar: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `Max image size is 5MB`,
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Must be PNG or JPEG",
    )
    .refine(async (file) => {
      if (!file) return true;
      // Check Magic Number
      const arrayBuffer = await file.arrayBuffer();
      const byteArray = new Uint8Array(arrayBuffer);

      const jpgMagicNumbers = [0xff, 0xd8, 0xff];
      const pngMagicNumbers = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

      const isJPEG = jpgMagicNumbers.every(
        (byte, index) => byteArray[index] === byte,
      );
      const isPNG = pngMagicNumbers.every(
        (byte, index) => byteArray[index] === byte,
      );
      return isJPEG || isPNG;
    }, "Must be PNG or JPEG"),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, {
      message: "Email must be at least 3 characters",
    })
    .regex(OWASP_EMAIL_REGEX, {
      message: "Invalid email address",
    })
    .refine(checkEmailLength, {
      message: "Local part and domain part must be 64 and 255 bytes or less",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
