import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { getProducts } from './products-list-model.js'
import { createEmptyProductList, createProductList } from './products-list-view.js'

export const productsListController = async (productsContainer) => {
	const productsWrapper = productsContainer.querySelector('.products-wrapper')
	const noProductsContainer = productsContainer.querySelector('.no-products-container')
	try {
		const productsLoadStarted = new CustomEvent('productsLoadStarted')
		productsContainer.dispatchEvent(productsLoadStarted)

		const query = window.location.search

		const { products, totalProducts } = await getProducts(query)

		if (totalProducts === 0) {
			productsWrapper.innerHTML = ''
			handleNoProducts(productsContainer)
		} else {
			noProductsContainer.innerHTML = ''
			showProducts(products, productsContainer)
		}

		const paginationUpdated = new CustomEvent('paginationUpdated', {
			detail: { totalProducts },
		})
		productsContainer.dispatchEvent(paginationUpdated)
	} catch (error) {
		handleProductsLoadFailed(productsContainer)
	} finally {
		const productsLoadEnded = new CustomEvent('productsLoadEnded')
		productsContainer.dispatchEvent(productsLoadEnded)
	}
}

const handleNoProducts = (productsContainer) => {
	const noProductsContainer = productsContainer.querySelector('.no-products-container')
	noProductsContainer.innerHTML = ''
	const emptyProductList = createEmptyProductList()
	noProductsContainer.appendChild(emptyProductList)
}

const showProducts = (products, productsContainer) => {
	const productsWrapper = productsContainer.querySelector('.products-wrapper')
	productsWrapper.innerHTML = ''
	products.forEach((product) => {
		const newProductElement = createProductList(product)

		productsWrapper.appendChild(newProductElement)
	})
	productsContainer.prepend(productsWrapper)
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
