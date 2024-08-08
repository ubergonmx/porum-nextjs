import { z } from "zod";

export const subporumSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(21)
    .refine(
      (name) => {
        // avoid word 'create'
        return name !== "create";
      },
      {
        message: "Subporum name cannot be 'create'",
      },
    ),
});

export const subporumSubscriptionSchema = z.object({
  subporumId: z.string().trim(),
});

export type CreateSubporumInput = z.infer<typeof subporumSchema>;
export type SubscribeToSubporumInput = z.infer<
  typeof subporumSubscriptionSchema
>;
