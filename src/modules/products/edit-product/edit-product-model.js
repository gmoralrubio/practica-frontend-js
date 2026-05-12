export const updateProduct = async (id, content) => {
	const url = `http://localhost:8000/api/products/${id}`
	const token = localStorage.getItem('token')

	const response = await fetch(url, {
		method: 'PATCH',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			...content,
		}),
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message)
	}
}
