import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  isCompleted: integer("isCompleted", { mode: "boolean" })
    .notNull()
    .default(false),
});
