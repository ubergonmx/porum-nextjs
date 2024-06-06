import { pgTableCreator, index, text, timestamp } from "drizzle-orm/pg-core";
import { DATABASE_PREFIX as prefix } from "@/lib/constants";

export const pgTable = pgTableCreator((name: string) => `${prefix}_${name}`);

export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    firstName: text("firstName").notNull(),
    lastName: text("lastName").notNull(),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    phoneNumber: text("phoneNumber"),
    image: text("image"),
    role: text("role").notNull().$type<"admin" | "user">(),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull(),
  },
  (t) => ({
    emailIdx: index("user_email_idx").on(t.email),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
