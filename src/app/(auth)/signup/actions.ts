"use server";

import { signupSchema, SignupInput } from "@/lib/validators/auth";
import { database as db } from "@/db/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Scrypt } from "lucia";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { Paths } from "@/lib/constants";
// import { argon2idConfig } from "@/lib/auth/hash";
// import { Argon2id } from "oslo/password";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function signup(
  values: SignupInput,
): Promise<ActionResponse<SignupInput>> {
  try {
    const parsed = signupSchema.safeParse(values);
    if (!parsed.success) {
      const err = parsed.error.flatten();
      return {
        fieldError: {
          firstName: err.fieldErrors.firstName?.[0],
          lastName: err.fieldErrors.lastName?.[0],
          username: err.fieldErrors.username?.[0],
          email: err.fieldErrors.email?.[0],
          password: err.fieldErrors.password?.[0],
          phone: err.fieldErrors.phone?.[0],
        },
      };
    }

    const { firstName, lastName, username, email, password, phone } = values;

    console.log(phone);

    const existingUsername = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.username, username),
      columns: { username: true },
    });

    if (existingUsername) {
      console.log("existingUsername", existingUsername);
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
      console.log("existingEmail", existingEmail);
      return {
        fieldError: {
          email: "Cannot create account with that email",
        },
      };
    }

    const hashedPassword = await new Scrypt().hash(password);
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
      })
      .returning();

    // const verificationCode = await generateEmailVerificationCode(user.id, email);
    // await sendMail(email, EmailTemplate.EmailVerification, { code: verificationCode });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect(Paths.Home);
  } catch (e) {
    console.error(e);
    return {
      formError: "An error occurred",
    };
  }
}
