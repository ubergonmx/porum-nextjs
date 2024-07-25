"use server";

import { loginSchema, LoginInput } from "@/lib/validators/auth";
import { database as db } from "@/db/database";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { Paths } from "@/lib/constants";
import { ActionResponse } from "@/lib/types";
import { loginRateLimit, getIP } from "@/lib/ratelimit";
import { verify } from "@node-rs/argon2";
import { argon2idConfig } from "@/lib/auth/hash";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function login(
  values: LoginInput,
): Promise<ActionResponse<LoginInput>> {
  try {
    const { success } = await loginRateLimit.limit(getIP() ?? values.email);

    if (!success) {
      return {
        formError: "Too many requests, please try again later",
      };
    }

    const parsed = loginSchema.safeParse(values);
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
    });

    if (!existingUser) {
      return {
        formError: "Incorrect email or password",
      };
    }

    const validPassword = await verify(
      existingUser.password,
      password,
      argon2idConfig,
    );
    if (!validPassword) {
      return {
        formError: "Incorrect email or password",
      };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    if (existingUser.role === "admin") {
      if (process.env.NODE_ENV === "development") {
        console.log("Admin logged in with id:", existingUser.id);
      }
      return redirect(Paths.AdminDashboard);
    }

    if (process.env.NODE_ENV === "development") {
      console.log("User logged in with id:", existingUser.id);
    }

    return redirect(Paths.Home);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.log(error);
    return {
      formError: "An error occurred. Please try again later.",
    };
  }
}
