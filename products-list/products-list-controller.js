import { NOTIFICATION_STATUS } from '../notification/notification-config.js'
import { getProducts } from './products-list-model.js'
import {
	createEmptyProductList,
	createProductList,
	createProductListWrapper,
} from './products-list-view.js'

export const productsListController = async (productsContainer, loggedUserInfo) => {
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
	const productListWrapper = createProductListWrapper()
	products.forEach((product) => {
		const newProductElement = createProductList(product)

		productListWrapper.appendChild(newProductElement)
	})
	productsContainer.appendChild(productListWrapper)
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
