import { Form, Link } from "@remix-run/react";
import { completedPutData, putData } from "~/action";
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

			<div className="mt-10">
				<h2 className="font-bold">未完了</h2>
				<ul>
					{data?.map((todo: Todo) => {
						if (!todo.isCompleted) {
							return (
								<li key={todo.id} className="flex gap-2">
									<Link to={`post/${todo.id}`}>{todo.title}</Link>
									<Form method="delete">
										<input type="hidden" name="todo-id" value={todo.id} />
										<button type="submit">消す</button>
									</Form>
									<Form method="put">
										<input type="hidden" value={todo.id} name="todo-id" />
										<input
											type="checkbox"
											name="todo-completed"
											checked={todo.isCompleted}
										/>
										<button type="submit">
											{todo.isCompleted ? "未完了にする" : "完了にする"}
										</button>
									</Form>
								</li>
							);
						}
					})}
				</ul>
			</div>

			<div className="mt-10">
				<h2 className="font-bold">完了</h2>
				<ul>
					{data?.map((todo: Todo) => {
						if (todo.isCompleted) {
							return (
								<li key={todo.id} className="flex gap-2">
									<Link to={`post/${todo.id}`}>{todo.title}</Link>
									<Form method="delete">
										<input type="hidden" name="todo-id" value={todo.id} />
										<button type="submit">消す</button>
									</Form>
									<Form method="put">
										<input type="hidden" value={todo.id} name="todo-id" />
										<input
											type="checkbox"
											name="todo-completed"
											checked={todo.isCompleted}
										/>
										<button type="submit">
											{todo.isCompleted ? "未完了にする" : "完了にする"}
										</button>
									</Form>
								</li>
							);
						}
					})}
				</ul>
			</div>
		</>
	);
};

export default TodoForm;
