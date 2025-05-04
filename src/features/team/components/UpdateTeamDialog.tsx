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
import { toast } from "sonner";

export function UpdateTeamDialog({ team }: { team: Team }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const handleUpdateTeam = (data: TeamFormSchema) => {
    dispatch(
      updateTeam({
        ...data,
        id: team.id,
      })
    );
    toast.success(`Team "${data.name}" updated successfully`);
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
