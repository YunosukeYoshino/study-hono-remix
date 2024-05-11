import { Form, Link, useFetcher } from "@remix-run/react";
import { completedPutData, putData } from "~/action";
import type { Todo } from "~/types/todo";

type TodoFormProps = {
	data: Todo[];
};

const TodoForm: React.FC<TodoFormProps> = ({ data }: TodoFormProps) => {
	const fetcher = useFetcher();
	const submitCompletedPut = ({
		id,
		isCompleted,
	}: Pick<Todo, "id" | "isCompleted">) => {
		const formData = new FormData();
		formData.append("todo-id", String(id));
		formData.append("isCompleted", String(isCompleted));
		fetcher.submit(formData, {
			method: "PUT",
		});
	};
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

			<div className="mt-10">
				<h2 className="font-bold">未完了</h2>
				<ul>
					{data?.map((todo: Todo) => {
						return (
							<li key={todo.id} className="flex gap-2">
								<Form method="put">
									<input type="hidden" value={todo.id} name="todo-id" />
									<input
										type="checkbox"
										defaultChecked={todo.isCompleted}
										onChange={() =>
											submitCompletedPut({
												id: todo.id,
												isCompleted: !todo.isCompleted,
											})
										}
									/>
								</Form>
								<Link to={`post/${todo.id}`}>{todo.title}</Link>
								<Form method="delete">
									<input type="hidden" name="todo-id" value={todo.id} />
									<button type="submit">消す</button>
								</Form>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default TodoForm;
