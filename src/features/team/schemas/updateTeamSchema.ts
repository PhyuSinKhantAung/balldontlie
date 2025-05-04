import { z } from "zod";
import { teamFormSchema } from "./teamFormSchema";

export const updateTeamSchema = teamFormSchema.merge(
  z.object({ id: z.number() })
);

export type UpdateTeamSchema = z.infer<typeof updateTeamSchema>;
