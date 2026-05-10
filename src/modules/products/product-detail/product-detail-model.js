export const getProductById = async (id) => {
	const url = `http://localhost:8000/api/products/${id}?_expand=user`

	const response = await fetch(url)
	const product = await response.json()

	if (!response.ok) {
		throw new Error('El producto no existe')
	}

	return product
}
