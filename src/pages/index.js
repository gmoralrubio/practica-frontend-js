import { newProductController } from '../modules/products/new-product/new-product-controller.js'
import { loaderController } from '../shared/loader/loader-controller.js'
import { notificationController } from '../shared/notification/notification-controller.js'
import { productsListController } from '../modules/products/products-list/products-list-controller.js'
import {
	getSessionNotification,
	removeSessionNotification,
} from '../shared/session-notification/session-notification-controller.js'
import { sessionController } from '../modules/session/session-controller.js'

const loaderContainer = document.querySelector('.loader-container')
const notificationContainer = document.querySelector('.notification-container')
const sessionContainer = document.querySelector('.session-container')
const productsContainer = document.querySelector('.products-container')
const newProductActionContainer = document.querySelector('.new-product-action-container')
const modal = document.querySelector('#modal')
const modalLoaderContainer = document.querySelector('.modal-loader-container')
const modalNotificationContainer = document.querySelector('.modal-notification-container')

const { showLoader, hideLoader } = loaderController(loaderContainer)
const { showNotification } = notificationController(notificationContainer)

// Product list eventos
productsContainer.addEventListener('productsLoadStarted', showLoader)
productsContainer.addEventListener('productsLoadEnded', hideLoader)
productsContainer.addEventListener('productsLoadFailed', (e) => {
	showNotification(e.detail)
})
sessionContainer.addEventListener('userInfoNotFounded', (e) => showNotification(e.detail))

// New product eventos
newProductActionContainer.addEventListener('productCreationStarted', showLoader)
newProductActionContainer.addEventListener('productCreationEnded', hideLoader)
newProductActionContainer.addEventListener('productCreationFailed', (e) =>
	showNotification(e.detail),
)
newProductActionContainer.addEventListener('productCreationSucceeded', (e) => {
	showNotification(e.detail)
	productsListController(productsContainer)
})

const sessionNotification = await getSessionNotification('sessionNotification')
if (sessionNotification) {
	showNotification(sessionNotification)
	removeSessionNotification('sessionNotification')
}

sessionController(sessionContainer)
productsListController(productsContainer)
newProductController(newProductActionContainer, modal)
