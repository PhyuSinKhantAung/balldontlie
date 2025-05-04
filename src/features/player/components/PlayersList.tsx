"use client";
import { useEffect } from "react";
import { useGetPlayers } from "../api/get-players.api";
import { useInView } from "react-intersection-observer";
import { PlayerCard } from "./PlayerCard";
import { Spinner } from "@/components/spinner";

export function PlayersList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetPlayers();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const players = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
      {isLoading && (
        <Spinner className="h-10 w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}

      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}

      <div ref={ref}>
        {isFetchingNextPage && (
          <Spinner className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
        {!hasNextPage && !isLoading && (
          <small className="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            No more players to load
          </small>
        )}
      </div>
    </div>
  );
}
