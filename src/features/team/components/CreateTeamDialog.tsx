"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { TeamForm } from "./TeamForm";
import { createTeam } from "../teamSlice";
import { TeamFormSchema } from "../schemas/teamFormSchema";
import { useAppDispatch } from "@/lib/redux/hooks";
import { useState } from "react";

export function CreateTeamDialog() {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const handleCreateTeam = (data: TeamFormSchema) => {
    console.log("data", data);
    dispatch(
      createTeam({ ...data, id: Math.floor(10000 + Math.random() * 90000) })
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button className="my-2">
          <Plus />
          Create Team
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>

        <TeamForm handleAction={handleCreateTeam} />
      </DialogContent>
    </Dialog>
  );
}
