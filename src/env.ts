import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string().min(1),
    SECRET_HASH: z.string().min(1),
    STORAGE: z.string().min(1),
    LOCAL_AVATAR_PATH: z.string().min(1),
    LOCAL_STORAGE_PATH: z.string().min(1),
    CREATE_ADMIN: z.boolean(),
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
  },
});
