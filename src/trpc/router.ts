import { createTRPCRouter } from "./init";
import { gameRouter } from "./posts";

export const trpcRouter = createTRPCRouter({
  game: gameRouter,
});

export type TRPCRouter = typeof trpcRouter;
