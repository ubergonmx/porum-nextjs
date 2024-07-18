import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    SECRET_HASH: z.string().trim().min(1),
    STORAGE: z.enum(["local", "online"]).default("local"),
    LOCAL_AVATAR_PATH: z.string().trim().min(1),
    LOCAL_STORAGE_PATH: z.string().trim().min(1),
    CREATE_ADMIN: z.enum(["true", "false"]).transform((v) => v === "true"),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().trim().min(1),
    SMTP_HOST: z.string().trim().min(1),
    SMTP_PORT: z.number().int().min(1),
    SMTP_USER: z.string().trim().min(1),
    SMTP_PASSWORD: z.string().trim().min(1),
  },
  client: { NEXT_PUBLIC_APP_URL: z.string().url() },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET_HASH: process.env.SECRET_HASH,
    STORAGE: process.env.STORAGE,
    LOCAL_AVATAR_PATH: process.env.LOCAL_AVATAR_PATH,
    LOCAL_STORAGE_PATH: process.env.LOCAL_STORAGE_PATH,
    CREATE_ADMIN: process.env.CREATE_ADMIN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  },
  emptyStringAsUndefined: true,
});
