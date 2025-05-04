"use client";
import { Button } from "@/components/ui/button";
import { CreateTeamDialog } from "./CreateTeamDialog";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectTeams } from "../teamSelectors";
import { TeamCard } from "./TeamCard";

export function TeamsList() {
  const teams = useAppSelector(selectTeams);

  return (
    <>
      <CreateTeamDialog />

      <div className="grid grid-cols-1 gap-4 my-2">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </>
  );
}
