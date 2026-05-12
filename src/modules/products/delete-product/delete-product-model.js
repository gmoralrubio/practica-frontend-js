export const deleteProduct = async (id) => {
	const url = `http://localhost:8000/api/products/${id}`
	const token = localStorage.getItem('token')

	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message)
	}
}
