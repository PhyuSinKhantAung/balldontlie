"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetPlayers } from "@/features/player/api/get-players.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { TeamFormSchema, teamFormSchema } from "../schemas/teamFormSchema";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/spinner";
import { Team } from "@/features/team/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";

export function TeamForm({
  team,
  handleAction,
  isEdit = false,
}: {
  team?: Team;
  handleAction: (team: TeamFormSchema) => void;
  isEdit?: boolean;
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetPlayers();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const players = data?.pages.flatMap((page) => page.data) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(teamFormSchema),
    defaultValues: team ? team : undefined,
  });

  const selectedPlayers = watch("players") || [];

  const togglePlayer = (id: number) => {
    setValue(
      "players",
      selectedPlayers.includes(id)
        ? selectedPlayers.filter((pid) => pid !== id)
        : [...selectedPlayers, id]
    );
  };

  const onSubmit = (data: TeamFormSchema) => {
    try {
      handleAction({
        ...data,
        playerCount: selectedPlayers.length,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create team");
      }
    }
  };

  return (
    <form className="grid gap-4 py-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Team Name</Label>
        <Input placeholder="Enter team name" {...register("name")} />
        {errors?.name && (
          <p className="text-sm text-destructive">{errors?.name.message}</p>
        )}
      </div>
      <div>
        <Label>Region</Label>
        <Input placeholder="Enter region" {...register("region")} />
        {errors?.region && (
          <p className="text-sm text-destructive">{errors?.region.message}</p>
        )}
      </div>
      <div>
        <Label>Country</Label>
        <Input placeholder="Enter country" {...register("country")} />
        {errors?.country && (
          <p className="text-sm text-destructive">{errors?.country.message}</p>
        )}
      </div>

      <div>
        <Label>Player Count</Label>
        <Input
          type="number"
          value={selectedPlayers?.length || 0}
          disabled
          {...register("playerCount")}
        />
        {errors?.playerCount && (
          <p className="text-sm text-destructive">
            {errors?.playerCount.message}
          </p>
        )}
      </div>

      <div>
        <Label>Players</Label>
        <ScrollArea className="h-40 rounded border p-2">
          {players.map((player) => (
            <label
              key={player.id}
              className={cn(
                "flex items-center gap-2 py-1 px-2 rounded hover:bg-muted",
                {
                  "bg-muted": selectedPlayers.includes(player.id),
                }
              )}
            >
              <Checkbox
                checked={selectedPlayers.includes(player.id)}
                onCheckedChange={() => togglePlayer(player.id)}
              />
              <span>
                {`${player.first_name} ${player.last_name} (ID: ${player.id})`}
              </span>
            </label>
          ))}

          <div ref={ref}>
            {isFetchingNextPage && <Spinner className="mx-auto" />}
            {!hasNextPage && !isLoading && (
              <small className="mx-auto">No more players to load</small>
            )}
          </div>
        </ScrollArea>

        {errors?.players && (
          <p className="text-sm text-destructive">{errors?.players.message}</p>
        )}

        {isError && (
          <p className="text-sm text-destructive mt-1">
            {"Error fetching players"}
          </p>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"ghost"} className="border">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
      </DialogFooter>
    </form>
  );
}
