import { Form, Link, useFetcher } from "@remix-run/react";
import React from "react";
import type { Todo } from "~/types/todo";

type TodoFormProps = {
	data: Todo[];
};

const TodoForm: React.FC<TodoFormProps> = ({ data }: TodoFormProps) => {
	const [newTitle, setNewTitle] = React.useState("");

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

	const submitTitlePut = ({ id, title }: Pick<Todo, "id" | "title">) => {
		const formData = new FormData();

		if (!title) return;
		formData.append("todo-id", String(id));
		formData.append("todo-title", String(title));

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
				<ul>
					{data?.map((todo: Todo) => {
						return (
							<li key={todo.id} className="flex gap-2">
								<input type="hidden" value={todo.id} name="todo-id" />
								<input
									type="checkbox"
									defaultChecked={todo.isCompleted}
									onChange={() =>
										submitCompletedPut({
											id: todo.id,
											isCompleted: todo.isCompleted,
										})
									}
								/>
								<Link to={`post/${todo.id}`}>{todo.title}</Link>
								<Form method="delete">
									<input type="hidden" name="todo-id" value={todo.id} />
									<button type="submit">消す</button>
								</Form>
								<Form
									method="put"
									onSubmit={() =>
										submitTitlePut({ id: todo.id, title: newTitle })
									}
								>
									<input
										className="border border-slate-400"
										type="text"
										value={newTitle}
										name="todo-title"
										onChange={(e) => {
											setNewTitle(todo.title);
											const newTitle = e.target.value;
											setNewTitle(newTitle);
										}}
									/>
									<button type="submit">編集する</button>
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
