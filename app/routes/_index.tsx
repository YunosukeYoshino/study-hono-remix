import {
  type LoaderFunction,
  json,
  type MetaFunction,
  ActionFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { deleteData, postData } from "~/action";
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const method = request.method;

  switch (method) {
    case "POST": {
      const title = formData.get("todo-title");
      if (typeof title !== "string" || title.trim().length === 0) {
        return json(
          { errors: { title: "TODOを入力してください" } },
          { status: 422 }
        );
      }
      return await postData(title);
    }

    case "DELETE": {
      const id = formData.get("todo-id");

      if (typeof id !== "string") {
        return json({ errors: { id: "IDが不正です" } }, { status: 400 });
      }
      return await deleteData(id);
    }

    default:
      return json(
        { errors: { method: "サポートされていないメソッドです" } },
        { status: 405 }
      );
  }
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
