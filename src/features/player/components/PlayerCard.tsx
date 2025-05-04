import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Player } from "../types";

export function PlayerCard({ player }: { player: Player }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-space-grotesk">
          ⛹️ {player.first_name} {player.last_name}
        </CardTitle>
        <CardDescription>Position: {player.position}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="text-sm">
          <li>Height: {player.height}</li>
          <li>Weight: {player.weight}</li>
          <li>Jersey Number: {player.jersey_number}</li>
          <li>Country: {player.country}</li>
          <li>College: {player.college}</li>
        </ul>
      </CardContent>
    </Card>
  );
}
