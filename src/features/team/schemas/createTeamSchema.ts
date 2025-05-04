import { z } from "zod";
import { teamFormSchema } from "./teamFormSchema";

export const createTeamSchema = teamFormSchema;

export type CreateTeamSchema = z.infer<typeof createTeamSchema>;
