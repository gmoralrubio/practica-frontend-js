import { getProducts } from './products-list-model.js'
import { createProductListElement } from './products-list-view.js'

export const productsListController = async (productsContainer) => {
	try {
		const products = await getProducts()
		showProducts(products, productsContainer)
	} catch (error) {
		console.warn(error)
	}
}

const showProducts = (products, productsContainer) => {
	products.forEach((product) => {
		const newProductElement = createProductListElement(product)
		productsContainer.appendChild(newProductElement)
	})
}
