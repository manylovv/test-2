import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "~/components/Spinner";
import { useTRPC } from "~/trpc/react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [gameName, setGameName] = useState("");

  const { data: games, isLoading: isLoadingPosts } = useQuery(
    trpc.game.myGames.queryOptions(),
  );

  const { mutate, isPending } = useMutation(trpc.game.create.mutationOptions());

  const handleCreateGame = () => {
    if (gameName.length === 0) {
      toast.error("Game name is required");
      return;
    }

    mutate({ name: gameName });
    queryClient.invalidateQueries({ queryKey: trpc.game.myGames.queryKey() });
    setGameName("");
  };

  return (
    <div className="p-10">
      <h3>My favorite games:</h3>

      {isLoadingPosts ? (
        <div>Loading...</div>
      ) : (
        <div>{games?.map((game) => <div key={game.id}>- {game.name}</div>)}</div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <input
          className="rounded-xl border border-indigo-500 px-4 py-2"
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <button
          className="rounded-full bg-indigo-500 px-4 py-2 text-white"
          type="button"
          onClick={handleCreateGame}
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <Spinner className="size-4 text-white" />
              Creating...
            </div>
          ) : (
            "Create new game"
          )}
        </button>
      </div>
    </div>
  );
}
