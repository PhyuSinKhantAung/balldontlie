import { z } from "zod";

export const teamFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty({ message: "Name is required" }).trim(),
  region: z.string().nonempty({ message: "Region is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
  playerCount: z.coerce
    .number()
    .nonnegative({ message: "Player count must be a positive number" })
    .default(0),

  players: z
    .array(z.number())
    .min(1, "Select at least one player")
    .refine(
      (val) => new Set(val).size === val.length,
      "Duplicate players not allowed"
    ),
});

export type TeamFormSchema = z.infer<typeof teamFormSchema>;
