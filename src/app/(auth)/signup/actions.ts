"use server";

import { signupSchema, SignupInput } from "@/lib/validators/auth";
import { database as db } from "@/db/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Scrypt } from "lucia";
import { users } from "@/db/schema";
import { lucia } from "@/lib/auth";
import { Paths } from "@/lib/constants";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function signup(
  _: any,
  formData: FormData,
): Promise<ActionResponse<SignupInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = signupSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { firstName, lastName, username, email, password, phone } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { email: true },
  });

  if (existingUser) {
    return {
      formError: "Cannot create account with that email",
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
      phone,
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
}
