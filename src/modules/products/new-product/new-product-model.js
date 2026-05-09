export const createNewProduct = async (newProduct) => {
	const url = 'http://localhost:8000/api/products'
	const token = localStorage.getItem('token')

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			...newProduct,
		}),
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message)
	}
}
