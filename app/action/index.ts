export async function postData(title: string) {
	const baseUrl = import.meta.env.VITE_API_URL;
	if (!baseUrl) {
		throw new Error("API_URL environment variable is not defined.");
	}

	const response = await fetch(`${baseUrl}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title }),
	});

	if (!response.ok) {
		throw new Error(`Failed to POST data: ${response.status}`);
	}

	const responseData = await response.json();
	return responseData;
}

export async function deleteData(id: string) {
	const baseUrl = import.meta.env.VITE_API_URL;
	if (!baseUrl) {
		throw new Error("API_URL environment variable is not defined.");
	}

	const response = await fetch(`${baseUrl}/${id}`, {
		// URLにIDを追加してリソースを指定
		method: "DELETE", // HTTPメソッドをDELETEに変更
	});

	if (!response.ok) {
		throw new Error(`Failed to DELETE data: ${response.status}`);
	}

	return { message: "Data deleted successfully." }; // 削除成功のメッセージを返す
}

export async function putData(id: string, title: string) {
	const baseUrl = import.meta.env.VITE_API_URL;
	if (!baseUrl) {
		throw new Error("API_URL environment variable is not defined.");
	}
	const response = await fetch(`${baseUrl}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title }),
	});
	if (!response.ok) {
		throw new Error(`Failed to PUT data: ${response.status}`);
	}
	const responseData = await response.json();
	return responseData;
}
export async function completedPutData(id: string, isCompleted: boolean) {
	const baseUrl = import.meta.env.VITE_API_URL;
	if (!baseUrl) {
		throw new Error("API_URL environment variable is not defined.");
	}

	const response = await fetch(`${baseUrl}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ isCompleted: !isCompleted }),
	});
	if (!response.ok) {
		throw new Error(`Failed to PUT data: ${response.status}`);
	}
	const responseData = await response.json();
	return responseData;
}
