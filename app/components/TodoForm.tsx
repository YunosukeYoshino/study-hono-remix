import { Form } from "@remix-run/react";
import { Todo } from "~/types/todo";

type TodoFormProps = {
  data: Todo[];
};

const TodoForm: React.FC<TodoFormProps> = ({ data }: TodoFormProps) => {
  return (
    <>
      <Form method="POST">
        <input type="text" className="border p-2" />
        <button type="button" className="p-2 bg-slate-200">
          Add
        </button>
      </Form>
      <ul className="mt-10">
        {data?.map((todo: Todo) => (
          <li key={todo.id} className="flex gap-2">
            {todo.title}
            <Form>
              <input type="checkbox" checked={todo.completed} />
            </Form>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoForm;
