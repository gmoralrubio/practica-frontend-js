export const getProducts = async (query) => {
	const url = `http://localhost:8000/api/products${query || '?_page=1&_limit=10'}`

	const response = await fetch(url)
	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message)
	}

	const headers = response.headers

	const totalProducts = Number(headers.get('X-total-count'))

	return { products: data, totalProducts }
}
