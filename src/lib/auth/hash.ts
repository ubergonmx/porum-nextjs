import { env } from "@/env";

export const argon2idConfig = {
  memorySize: 65536,
  iterations: 4,
  tagLength: 32,
  parallelism: 2,
  secret: Buffer.from(env.SECRET_HASH, "base64"),
};
