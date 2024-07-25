"use server";

import { signupSchema, SignupInput } from "@/lib/validators/auth";
import { database as db } from "@/db/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { Paths } from "@/lib/constants";
import { ActionResponse } from "@/lib/types";
import { writeFile as fsWriteFile } from "fs/promises";
import { env } from "@/env";
import { standardRateLimit, getIP } from "@/lib/ratelimit";
import { argon2idConfig } from "@/lib/auth/hash";
import { EmailTemplate, sendMail } from "@/lib/email";
import { generateEmailVerificationCode } from "../verify-email/actions";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signup(
  values: SignupInput,
  formData: FormData,
): Promise<ActionResponse<SignupInput>> {
  try {
    const { success } = await standardRateLimit.limit(getIP() ?? values.email);

    if (!success) {
      return {
        formError: "Unable to process this time",
      };
    }

    const obj = Object.fromEntries(formData.entries());
    values.avatar = obj.avatar as File;
    const parsed = await signupSchema
      .omit({ phone: true })
      .safeParseAsync(values);
    if (!parsed.success) {
      const err = parsed.error.flatten();
      return {
        fieldError: {
          firstName: err.fieldErrors.firstName?.[0],
          lastName: err.fieldErrors.lastName?.[0],
          username: err.fieldErrors.username?.[0],
          email: err.fieldErrors.email?.[0],
          password: err.fieldErrors.password?.[0],
          avatar: err.fieldErrors.avatar?.[0],
        },
      };
    }

    const { firstName, lastName, username, email, password, avatar } =
      parsed.data;
    const phone = values.phone;

    const existingUsername = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.username, username),
      columns: { username: true },
    });
    if (existingUsername) {
      return {
        fieldError: {
          username: "Username already exists",
        },
      };
    }

    const existingEmail = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
      columns: { email: true },
    });

    if (existingEmail) {
      return {
        fieldError: {
          email: "Cannot create account with that email",
        },
      };
    }

    let filename: string | undefined;
    if (avatar) {
      if (env.STORAGE === "local") {
        filename = `${Date.now()}-${generateIdFromEntropySize(5)}-${avatar.name.replaceAll(" ", "_")}`;
        const buffer = Buffer.from(await avatar.arrayBuffer());
        const fullPath = process.cwd() + "/" + env.LOCAL_AVATAR_PATH + filename;
        await fsWriteFile(fullPath, buffer);

        if (env.NODE_ENV === "development") {
          console.log("[DEV] Avatar saved to", fullPath);
        }
      }
    }
    const hashedPassword = await hash(password, argon2idConfig);

    const [user] = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        phoneNumber: phone,
        role: "user",
        avatar: filename,
      })
      .returning();

    const verificationCode = await generateEmailVerificationCode(
      user.id,
      email,
    );
    await sendMail(email, EmailTemplate.EmailVerification, {
      code: verificationCode,
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    if (env.NODE_ENV === "development") {
      console.log("User created successfully", user);
    }

    return redirect(Paths.VerifyEmail);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      formError: "An error occurred",
    };
  }
}
