import {
  pgTableCreator,
  index,
  text,
  serial,
  int,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";
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

export const Threads = pgTable("threads", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  user_id: int("user_id").references(() => users.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const Posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  thread_id: int("thread_id").references(() => Threads.id, {
    onDelete: "cascade",
  }),
  user_id: int("user_id").references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const Comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  post_id: int("post_id").references(() => Posts.id, { onDelete: "cascade" }),
  user_id: int("user_id").references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
