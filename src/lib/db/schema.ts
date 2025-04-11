import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});
