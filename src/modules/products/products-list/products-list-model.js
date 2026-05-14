export const getProducts = async (filters = '') => {
	const url = `http://localhost:8000/api/products?_page=1${filters}`

	const response = await fetch(url)
	const products = await response.json()

	return products
}
