"use server";

import { loginSchema, LoginInput } from "@/lib/validators/auth";
import { database as db } from "@/db/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Scrypt } from "lucia";
import { lucia } from "@/lib/auth";
import { Paths } from "@/lib/constants";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function login(
  _: any,
  formData: FormData,
): Promise<ActionResponse<LoginInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = loginSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { id: true, email: true, password: true },
  });

  if (!existingUser) {
    return {
      formError: "Wrong email or password",
    };
  }

  // Check if the password is correct
  const validPassword = await new Scrypt().verify(
    password,
    existingUser.password,
  );

  if (!validPassword) {
    return {
      formError: "Wrong email or password",
    };
  }

  // Login the user and create a session
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(Paths.Home);
}
