import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/axios/axios";
import { PlayersResponse } from "../types";

// Fetch players with cursor pagination
const fetchPlayers = async ({ pageParam = 0 }): Promise<PlayersResponse> => {
  const response = await api.get<PlayersResponse>("/players", {
    params: {
      per_page: 10,
      cursor: pageParam,
    },
  });
  return response.data;
};

export const useGetPlayers = () => {
  return useInfiniteQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.next_cursor ?? undefined;
    },
  });
};
