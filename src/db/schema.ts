import {
  pgTableCreator,
  index,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { DATABASE_PREFIX as prefix } from "@/lib/constants";
import { generateIdFromEntropySize } from "lucia";

export const pgTable = pgTableCreator((name: string) => `${prefix}_${name}`);

export const roleEnum = pgEnum("role", ["admin", "moderator", "user"]);

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateIdFromEntropySize(10)),
    username: text("username").unique().notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").unique().notNull(),
    emailVerified: timestamp("email_verified", { mode: "date" }),
    password: text("password").notNull(),
    phoneNumber: text("phone_number"),
    avatar: text("avatar"),
    role: roleEnum("role").notNull(),
    createdAt: timestamp("created_at", {
      mode: "date",
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", {
      mode: "date",
      withTimezone: true,
    }).$onUpdate(() => new Date()),
  },
  (t) => ({
    emailIdx: index("user_email_idx").on(t.email),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("session_user_idx").on(t.userId),
  }),
);

export const emailVerificationCodes = pgTable(
  "email_verification_codes",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateIdFromEntropySize(10)),
    userId: text("user_id").unique().notNull(),
    email: text("email").notNull(),
    code: text("code").notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("verification_code_user_idx").on(t.userId),
    emailIdx: index("verification_code_email_idx").on(t.email),
  }),
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateIdFromEntropySize(10)),
    userId: text("user_id").notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("password_token_user_idx").on(t.userId),
  }),
);
