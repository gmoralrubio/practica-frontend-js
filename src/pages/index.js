import { newProductController } from '../modules/products/new-product/new-product-controller.js'
import { loaderController } from '../shared/loader/loader-controller.js'
import { notificationController } from '../shared/notification/notification-controller.js'
import { productsListController } from '../modules/products/products-list/products-list-controller.js'
import {
	getSessionNotification,
	removeSessionNotification,
} from '../shared/session-notification/session-notification-controller.js'
import { sessionController } from '../modules/session/session-controller.js'
import { filtersController } from '../modules/products/filters/filters-controller.js'
import { paginationController } from '../modules/products/pagination/pagination-controller.js'

const notificationContainer = document.querySelector('.notification-container')
const sessionContainer = document.querySelector('.session-container')
const productsContainer = document.querySelector('.products-container')
const productsLoaderContainer = document.querySelector('.products-loader-container')
const newProductActionContainer = document.querySelector('.new-product-action-container')
const filtersContainer = document.querySelector('.filters-container')
const paginationContainer = document.querySelector('.pagination-container')
const modal = document.querySelector('.modal')
const modalNotificationContainer = modal.querySelector('.modal-notification-container')
const modalLoaderContainer = modal.querySelector('.modal-loader-container')
const modalInnerContainer = modal.querySelector('.modal-inner-container')

const { showLoader, hideLoader } = loaderController()
const { showNotification } = notificationController()

sessionContainer.addEventListener('userInfoNotFounded', (e) =>
	showNotification(notificationContainer, e.detail),
)

// Product list eventos
productsContainer.addEventListener('productsLoadStarted', () =>
	showLoader(productsLoaderContainer),
)
productsContainer.addEventListener('productsLoadEnded', () =>
	hideLoader(productsLoaderContainer),
)
productsContainer.addEventListener('productsLoadFailed', (e) => {
	showNotification(notificationContainer, e.detail)
})

// New product eventos
newProductActionContainer.addEventListener('newProductBtnClicked', () =>
	modal.showModal(),
)
newProductActionContainer.addEventListener('closeModalBtnClicked', () => modal.close())
newProductActionContainer.addEventListener('productCreationStarted', () => {
	const form = modal.querySelector('.new-product-form')
	form?.classList.add('hidden')
	showLoader(modalLoaderContainer)
})
newProductActionContainer.addEventListener('productCreationEnded', () => {
	const form = modal.querySelector('.new-product-form')
	form?.classList.remove('hidden')
	hideLoader(modalLoaderContainer)
})
newProductActionContainer.addEventListener('productCreationFailed', (e) =>
	showNotification(modalNotificationContainer, e.detail),
)
newProductActionContainer.addEventListener('productCreationSucceeded', (e) => {
	modal.close()
	showNotification(notificationContainer, e.detail)
	productsListController(productsContainer)
})

// Pagination
productsContainer.addEventListener('paginationUpdated', (e) => {
	paginationController(paginationContainer, e.detail.totalProducts)
})
paginationContainer.addEventListener('paginationChanged', (e) => {
	const query = new URLSearchParams(window.location.search)
	query.set('_page', e.detail.newPage)
	window.location.search = query

	productsListController(productsContainer)
})

// Filters
filtersContainer.addEventListener('filtersChanged', (e) => {
	productsListController(productsContainer)
})

const sessionNotification = await getSessionNotification('sessionNotification')
if (sessionNotification) {
	showNotification(notificationContainer, sessionNotification)
	removeSessionNotification('sessionNotification')
}

filtersController(filtersContainer)
sessionController(sessionContainer)
productsListController(productsContainer)
newProductController(newProductActionContainer, modalInnerContainer)
