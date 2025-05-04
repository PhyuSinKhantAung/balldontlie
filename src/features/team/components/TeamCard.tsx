import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Team } from "../types";
import { UpdateTeamDialog } from "./UpdateTeamDialog";
import { DeleteTeamDialog } from "./DeleteTeamDialog";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-space-grotesk">🏀 {team.name}</CardTitle>
        <CardDescription>Player IDs: {team.players.join(", ")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="text-sm">
          <li>Region: {team.region}</li>
          <li>Country: {team.country}</li>
          <li>Player Count: {team.playerCount}</li>
        </ul>
      </CardContent>
      <CardFooter>
        <div className="flex gap-x-4 items-center">
          <UpdateTeamDialog team={team} />
          <DeleteTeamDialog team={team} />
        </div>
      </CardFooter>
    </Card>
  );
}
