import { Lucia, TimeSpan, Scrypt } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { env } from "@/env";
import { sessions, users, type User as DbUser } from "@/db/schema";
import { database as db } from "@/db/database";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: () => {
    return {};
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      avatar: attributes.avatar,
      role: attributes.role,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  },
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "session",
    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes extends Omit<DbUser, "password"> {}

declare module "lucia" {
  // eslint-disable-next-line no-unused-vars
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

async function createAdminUser() {
  const existingAdmin = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.role, "admin"),
    columns: { id: true },
  });
  if (existingAdmin) {
    console.log("[DEV] Admin user already exists");
    return;
  }

  const firstName = "Admin";
  const lastName = "User";
  const username = "admin";
  const email = "admin@example.com";
  const password = "a6509314aeb22d38";
  const hashedPassword = await new Scrypt().hash(password);

  await db.insert(users).values({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log("[DEV] Admin user created successfully");
}

if (env.NODE_ENV === "development" && env.CREATE_ADMIN) {
  createAdminUser().catch(console.error);
}
