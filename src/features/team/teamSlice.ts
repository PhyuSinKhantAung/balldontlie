import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Team } from "./types";

type TeamsState = {
  teams: Team[];
  playerToTeamMap: Record<number, number>; // playerId -> teamId
};

const initialState: TeamsState = {
  teams: [],
  playerToTeamMap: {},
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    createTeam: (state, action: PayloadAction<Team>) => {
      const { id, name, players } = action.payload;

      // Check for duplicate team name (case-insensitive)
      const nameExists = state.teams.some(
        (team) => team.name.trim().toLowerCase() === name.trim().toLowerCase()
      );

      if (nameExists) {
        throw new Error(`Team name "${name}" already exists`);
      }

      // Check if any player is already in another team
      const playersInOtherTeams = players.filter(
        (playerId) => state.playerToTeamMap[playerId] !== undefined
      );

      if (playersInOtherTeams.length > 0) {
        throw new Error(`One or more players are already in another team`);
      }

      state.teams.push(action.payload);

      players.forEach((playerId) => {
        state.playerToTeamMap[playerId] = id;
      });
    },

    updateTeam: (state, action: PayloadAction<Team>) => {
      const { id, name, players } = action.payload;
      const teamIndex = state.teams.findIndex((t) => t.id === id);

      if (teamIndex === -1) return;

      const currentTeam = state.teams[teamIndex];

      // Check for duplicate team name (excluding current team, case-insensitive)
      const nameExists = state.teams.some(
        (team) =>
          team.id !== id &&
          team.name.trim().toLowerCase() === name.trim().toLowerCase()
      );

      if (nameExists) {
        throw new Error(`Team name "${name}" already exists`);
      }

      // Check for players that are in other teams (excluding current team)
      const playersInOtherTeams = players.filter(
        (playerId) =>
          state.playerToTeamMap[playerId] !== undefined &&
          state.playerToTeamMap[playerId] !== id
      );

      if (playersInOtherTeams.length > 0) {
        throw new Error(`One or more players are already in another team`);
      }

      // Remove players that are no longer in the team
      const removedPlayers = currentTeam.players.filter(
        (playerId) => !players.includes(playerId)
      );
      removedPlayers.forEach((playerId) => {
        delete state.playerToTeamMap[playerId];
      });

      state.teams[teamIndex] = action.payload;

      players.forEach((playerId) => {
        state.playerToTeamMap[playerId] = id;
      });
    },

    deleteTeam: (state, action: PayloadAction<number>) => {
      const teamId = action.payload;
      const teamIndex = state.teams.findIndex((t) => t.id === teamId);

      if (teamIndex === -1) return;

      const teamToDelete = state.teams[teamIndex];

      teamToDelete.players.forEach((playerId) => {
        delete state.playerToTeamMap[playerId];
      });

      state.teams.splice(teamIndex, 1);
    },
  },
});

export const { createTeam, updateTeam, deleteTeam } = teamSlice.actions;
export default teamSlice.reducer;
