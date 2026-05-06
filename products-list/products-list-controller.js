import { NOTIFICATION_TYPE } from '../notification/notification-config.js'
import { getProducts } from './products-list-model.js'
import { createProductListElement } from './products-list-view.js'

export const productsListController = async (productsContainer) => {
	productsContainer.innerHTML = ''
	try {
		const productsLoadStarted = new CustomEvent('productsLoadStarted')
		productsContainer.dispatchEvent(productsLoadStarted)

		const products = await getProducts()
		if (products.length === 0) {
			const noProductsFounded = new CustomEvent('noProductsFounded', {
				detail: {
					message: 'No hay ningún producto añadido',
					type: NOTIFICATION_TYPE.info,
				},
			})
			productsContainer.dispatchEvent(noProductsFounded)
		}
		showProducts(products, productsContainer)
	} catch (error) {
		const productsLoadFailed = new CustomEvent('productsLoadFailed', {
			detail: {
				message: 'No ha sido posible obtener tweets',
				type: NOTIFICATION_TYPE.error,
			},
		})
		productsContainer.dispatchEvent(productsLoadFailed)
	} finally {
		const productsLoadEnded = new CustomEvent('productsLoadEnded')
		productsContainer.dispatchEvent(productsLoadEnded)
	}
}

const showProducts = (products, productsContainer) => {
	products.forEach((product) => {
		const newProductElement = createProductListElement(product)
		productsContainer.appendChild(newProductElement)
	})
}
