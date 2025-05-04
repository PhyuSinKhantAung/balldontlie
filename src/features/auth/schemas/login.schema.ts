import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().nonempty({ message: "Username is required" }).trim(),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .trim()
    .min(6, "Password must have at least 6 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
