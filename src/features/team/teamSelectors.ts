import { RootState } from "@/lib/redux/store";

export const selectTeams = (state: RootState) => state.team.teams;
