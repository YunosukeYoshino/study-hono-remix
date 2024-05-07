import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import type { Todo } from "~/types/todo";

//  このページは、特定のIDのTodoを表示するページです。
// 1. このページのURLは `/update/:id` です。
// 2. このページは、指定されたIDのTodoを取得し、そのTodoのタイトルを表示します。
// 3. Todoのタイトルの隣には、編集ボタンがあります。
// 4. 編集ボタンをクリックすると、タイトルが編集可能になります。
// 5. 編集可能な状態で、タイトルを変更し、Enterキーを押すと、そのタイトルに変更されます。
// 6. 編集可能な状態で、フォーカスを外すと、変更が破棄されます。

// TODO:setNewTitleで更新された値をAPIに送信する(PUT)

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const baseUrl = import.meta.env.VITE_API_URL;
	console.log(`${baseUrl}/${params.id}`);

	const response = await fetch(`${baseUrl}/${params.id}`);

	const data = await response.json();

	return json({ post: data });
};

export default function PostDetailPage() {
	const { post } = useLoaderData() as { post: Todo };

	const [isEditing, setIsEditing] = React.useState(false);
	const [newTitle, setNewTitle] = React.useState(post.title);

	if (!post)
		return (
			<div>
				<h1>Post not found</h1>
			</div>
		);
	return (
		<Form className="flex gap-4">
			<input checked={post.completed} type="checkbox" />

			{!isEditing ? (
				<>
					<h1>{post.title}</h1>
				</>
			) : (
				<>
					<input
						className="border border-slate-400"
						type="text"
						value={newTitle}
						onChange={(e) => {
							const newTitle = e.target.value;
							setNewTitle(newTitle);
						}}
					/>
				</>
			)}

			<button
				type="button"
				onClick={() => {
					setIsEditing(!isEditing);
				}}
			>
				編集する
			</button>
		</Form>
	);
}
