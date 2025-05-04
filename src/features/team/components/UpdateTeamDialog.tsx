"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilLine } from "lucide-react";
import { TeamForm } from "./TeamForm";
import { updateTeam } from "../teamSlice";
import { TeamFormSchema } from "../schemas/teamFormSchema";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Team } from "../types";
import { useState } from "react";

export function UpdateTeamDialog({ team }: { team: Team }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const handleUpdateTeam = (data: TeamFormSchema) => {
    console.log("updated data", data);
    dispatch(
      updateTeam({
        ...data,
        id: team.id,
      })
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PencilLine />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit New Team</DialogTitle>
        </DialogHeader>

        <TeamForm handleAction={handleUpdateTeam} team={team} isEdit={true} />
      </DialogContent>
    </Dialog>
  );
}
