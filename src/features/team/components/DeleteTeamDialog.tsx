"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/lib/redux/hooks";
import { deleteTeam } from "../teamSlice";
import { Team } from "../types";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteTeamDialog({ team }: { team: Team }) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDeleteTeam = async () => {
    try {
      setIsDeleting(true);
      dispatch(deleteTeam(team.id));
      toast.success(`Team "${team.name}" deleted successfully`);
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete team");
      console.error("Delete team error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Team</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{team.name}</strong>? This
            action cannot be undone and will remove all associated players from
            this team.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteTeam}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
