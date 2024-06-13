import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    SECRET_HASH: z.string().min(1),
    STORAGE: z.enum(["local", "online"]).default("local"),
    LOCAL_AVATAR_PATH: z.string().min(1),
    LOCAL_STORAGE_PATH: z.string().min(1),
    CREATE_ADMIN: z.enum(["true", "false"]).transform((v) => v === "true"),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET_HASH: process.env.SECRET_HASH,
    STORAGE: process.env.STORAGE,
    LOCAL_AVATAR_PATH: process.env.LOCAL_AVATAR_PATH,
    LOCAL_STORAGE_PATH: process.env.LOCAL_STORAGE_PATH,
    CREATE_ADMIN: process.env.CREATE_ADMIN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
});
