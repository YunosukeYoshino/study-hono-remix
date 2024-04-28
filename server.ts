import { Hono } from "hono";
// import { basicAuth } from "hono/basic-auth";
import { secureHeaders } from "hono/secure-headers";
import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "./build/server";
import { drizzle } from "drizzle-orm/d1";
import { todos } from "drizzle/schema";
import { eq } from "drizzle-orm";

const remixHandler = createRequestHandler(build, process.env.NODE_ENV);
type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// app.use(
//   "*",
//   basicAuth({
//     username: "hono",
//     password: "acoolproject",
//   })
// );

/**
 * todos
 */
app.get("/todos", async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(todos).all();
  return c.json(result);
});

/**
 * create todo
 */
app.post("/todos", async (c) => {
  const params = await c.req.json<typeof todos.$inferSelect>();
  const db = drizzle(c.env.DB);
  const result = await db
    .insert(todos)
    .values({ title: params.title })
    .execute();
  return c.json(result);
});

/**
 * update todo
 */
app.put("/todos/:id", async (c) => {
  const id = Number.parseInt(c.req.param("id"));

  if (Number.isNaN(id)) {
    return c.json({ error: "invalid ID" }, 400);
  }

  const params = await c.req.json<typeof todos.$inferSelect>();
  const db = drizzle(c.env.DB);
  const result = await db
    .update(todos)
    .set({ title: params.title, isCompleted: params.isCompleted })
    .where(eq(todos.id, id));
  return c.json(result);
});

/**
 * delete todo
 */
app.delete("/todos/:id", async (c) => {
  const id = Number.parseInt(c.req.param("id"));

  if (Number.isNaN(id)) {
    return c.json({ error: "invalid ID" }, 400);
  }

  const db = drizzle(c.env.DB);
  const result = await db.delete(todos).where(eq(todos.id, id));
  return c.json(result);
});

app.use("*", secureHeaders());

app.mount("/", remixHandler);

export default app;
