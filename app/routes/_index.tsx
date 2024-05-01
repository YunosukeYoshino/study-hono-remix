import {
  type LoaderFunction,
  json,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import TodoForm from "~/components/TodoForm";
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
  const baseUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(baseUrl);
  if (response.ok) {
    const data: Todo[] = await response.json();
    return json({ data });
  }
  return json({ response: null });
};

export default function Index() {
  const { data } = useLoaderData<LoaderData>();

  if (!data) return <div>データがありません。</div>;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <TodoForm data={data} />
    </div>
  );
}
