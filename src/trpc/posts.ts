import { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { db } from "~/lib/db";
import { games } from "~/lib/db/schema";
import { publicProcedure } from "./init";

export const gameRouter = {
  myGames: publicProcedure.query(async () => {
    return db.select().from(games);
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await db.insert(games).values({ name: input.name });
    }),
} satisfies TRPCRouterRecord;
