export const getProducts = async (query) => {
	const url = `http://localhost:8000/api/products${query}`

	console.log(url)

	const response = await fetch(url)
	const products = await response.json()

	return products
}
