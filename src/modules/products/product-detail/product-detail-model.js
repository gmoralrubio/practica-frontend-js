export const getProductById = async (id) => {
	const url = `http://localhost:8000/api/products/${id}?_expand=user`

	const response = await fetch(url)
	const data = await response.json()

	if (!response.ok) {
		throw new Error('No existe el producto.')
	}

	return data
}

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
