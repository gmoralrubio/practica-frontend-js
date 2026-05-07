import { NOTIFICATION_STATUS } from '../notification/notification-config.js'
import { getProducts } from './products-list-model.js'
import { createEmptyProductList, createProductList } from './products-list-view.js'

export const productsListController = async (productsContainer) => {
	try {
		const productsLoadStarted = new CustomEvent('productsLoadStarted')
		productsContainer.dispatchEvent(productsLoadStarted)

		const products = await getProducts()

		if (products.length === 0) {
			const emptyProductList = createEmptyProductList()
			productsContainer.appendChild(emptyProductList)
		} else {
			showProducts(products, productsContainer)
		}
	} catch (error) {
		handleProductsLoadFailed(productsContainer, error)
	} finally {
		const productsLoadEnded = new CustomEvent('productsLoadEnded')
		productsContainer.dispatchEvent(productsLoadEnded)
	}
}

const showProducts = (products, productsContainer) => {
	const productsWrapper = productsContainer.querySelector('.products-wrapper')
	productsWrapper.innerHTML = ''
	products.forEach((product) => {
		const newProductElement = createProductList(product)

		productsWrapper.appendChild(newProductElement)
	})
}

const handleProductsLoadFailed = (productsContainer, error) => {
	const productsLoadFailed = new CustomEvent('productsLoadFailed', {
		detail: {
			message: 'No ha sido posible obtener productos',
			status: NOTIFICATION_STATUS.error,
		},
	})
	productsContainer.dispatchEvent(productsLoadFailed)
}
