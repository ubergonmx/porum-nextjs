import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("p_user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  phoneNumber: text("phoneNumber"),
  profileImage: text("profileImage"),
  image: text("image"),
});
