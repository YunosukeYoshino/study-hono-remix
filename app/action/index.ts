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
