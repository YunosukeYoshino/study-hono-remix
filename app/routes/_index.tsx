import {
  type LoaderFunction,
  json,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import type { Todo } from "~/types/todo";

type LoaderData = {
  data: Todo[];
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export const loader: LoaderFunction = async () => {
  const response = await fetch("http://localhost:8787/todos");

  if (response.ok) {
    const data: Todo[] = await response.json();
    return json({ data });
  }
  return json({ response: null });
};

export default function Index() {
  const { data } = useLoaderData<LoaderData>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <ul>
        {data?.map((todo: Todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? "Completed" : "Not completed"}
          </li>
        ))}
      </ul>
    </div>
  );
}
