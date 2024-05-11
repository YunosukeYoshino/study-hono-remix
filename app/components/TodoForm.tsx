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
				<ul className="space-y-2">
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

								<Form
									onSubmit={() =>
										submitTitlePut({ id: todo.id, title: newTitle })
									}
									className="flex gap-2"
								>
									<input
										className="w-[300px] focus:outline-blue-500"
										type="text"
										defaultValue={todo.title}
										name="todo-title"
										onChange={(e) => {
											const newTitle = e.target.value;
											setNewTitle(newTitle);
										}}
									/>
									<button type="submit">編集する</button>
								</Form>

								<Form method="delete">
									<input type="hidden" name="todo-id" value={todo.id} />
									<button type="submit">消す</button>
								</Form>
								<Link to={`post/${todo.id}`}>詳細ページ</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default TodoForm;
