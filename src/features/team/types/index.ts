export type Team = {
  id: number;
  name: string;
  region: string;
  country: string;
  playerCount: number;
  players: number[]; // array of player IDs
};
