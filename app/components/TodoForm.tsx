import { Form } from "@remix-run/react";
import type { Todo } from "~/types/todo";

type TodoFormProps = {
  data: Todo[];
};

const TodoForm: React.FC<TodoFormProps> = ({ data }: TodoFormProps) => {
  return (
    <>
      <Form method="post">
        <input
          type="text"
          className="border p-2"
          name="todo-title"
          placeholder="New task"
        />
        <button type="submit" className="bg-slate-200 p-2">
          Add
        </button>
      </Form>
      <ul className="mt-10">
        {data?.map((todo: Todo) => (
          <li key={todo.id} className="flex gap-2">
            {todo.title}
            <input type="checkbox" checked={todo.completed} />
            <Form method="delete">
              <input type="hidden" name="todo-id" value={todo.id} />
              <button type="submit">消す</button>
            </Form>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoForm;
