import { z } from "zod";

export const subporumSchema = z.object({
  name: z.string().min(3).max(21),
});

export const subporumSubscriptionSchema = z.object({
  subporumId: z.string(),
});

export type CreateSubporumInput = z.infer<typeof subporumSchema>;
export type SubscribeToSubporumInput = z.infer<
  typeof subporumSubscriptionSchema
>;
