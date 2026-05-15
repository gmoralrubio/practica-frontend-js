export const getProducts = async (query) => {
	const url = `http://localhost:8000/api/products${query || '?_page=1&_limit=10'}`

	const response = await fetch(url)
	const products = await response.json()
	const headers = response.headers

	const totalProducts = headers.get('X-total-count')

	return { products, totalProducts }
}
