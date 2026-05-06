import {
	NOTIFICATION_ACTIONS,
	NOTIFICATION_STATUS,
} from '../notification/notification-config.js'
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
					title: 'No hay ningún producto añadido',
					message:
						'Para poder añadir productos, primero tienes que iniciar sesión',
					action: NOTIFICATION_ACTIONS.login,
				},
			})
			productsContainer.dispatchEvent(noProductsFounded)
		}
		showProducts(products, productsContainer)
	} catch (error) {
		const productsLoadFailed = new CustomEvent('productsLoadFailed', {
			detail: {
				message: 'No ha sido posible obtener tweets',
				status: NOTIFICATION_STATUS.error,
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
