import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { secureHeaders } from "hono/secure-headers";
import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "./build/server";

const remixHandler = createRequestHandler(build, process.env.NODE_ENV);

const app = new Hono();

// app.use(
//   "*",
//   basicAuth({
//     username: "hono",
//     password: "acoolproject",
//   })
// );

app.get("/todos", (c) => {
  const todos = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Walk the dog", completed: true },
    { id: 3, title: "Do laundry", completed: false },
  ];
  return c.json(todos);
});

app.post("/todos", (c) => {
  const newTodo = { id: 4, title: "Clean the house", completed: false };
  return c.json(newTodo);
});

app.put("/todos/:id", (c) => {
  const updatedTodo = { id: 4, title: "Clean the house", completed: true };
  return c.json(updatedTodo);
});

app.delete("/todos/:id", (c) => {
  return c.json({ message: "Todo deleted successfully" });
});

app.use("*", secureHeaders());

app.mount("/", remixHandler);

export default app;
