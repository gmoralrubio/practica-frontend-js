import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { getProducts } from './products-list-model.js'
import {
	createEmptyProductList,
	createProductList,
	createProductListWrapper,
} from './products-list-view.js'

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
		handleProductsLoadFailed(productsContainer)
	} finally {
		const productsLoadEnded = new CustomEvent('productsLoadEnded')
		productsContainer.dispatchEvent(productsLoadEnded)
	}
}

const showProducts = (products, productsContainer) => {
	productsContainer.innerHTML = ''
	const productListWrapper = createProductListWrapper()
	products.forEach((product) => {
		const newProductElement = createProductList(product)

		productListWrapper.appendChild(newProductElement)
	})
	productsContainer.appendChild(productListWrapper)
}

const handleProductsLoadFailed = (productsContainer) => {
	const productsLoadFailed = new CustomEvent('productsLoadFailed', {
		detail: {
			message: 'No ha sido posible obtener productos',
			status: NOTIFICATION_STATUS.error,
		},
	})
	productsContainer.dispatchEvent(productsLoadFailed)
}
