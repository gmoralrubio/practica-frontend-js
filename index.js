import { newProductController } from './new-product/new-product-controller.js'
import { loaderController } from './loader/loader-controller.js'
import { notificationController } from './notification/notification-controller.js'
import { productsListController } from './products-list/products-list-controller.js'
import {
	getSessionNotification,
	removeSessionNotification,
} from './session-notification/session-notification-controller.js'
import { sessionController } from './session/session-controller.js'

const loaderContainer = document.querySelector('.loader-container')
const notificationContainer = document.querySelector('.notification-container')
const sessionContainer = document.querySelector('.session-container')
const productsContainer = document.querySelector('.products-container')
const newProductActionContainer = document.querySelector('.new-product-action-container')
const modal = document.querySelector('#modal')

const { showLoader, hideLoader } = loaderController(loaderContainer)
const { showNotification } = notificationController(notificationContainer)

productsContainer.addEventListener('productsLoadStarted', showLoader)
productsContainer.addEventListener('productsLoadEnded', hideLoader)
productsContainer.addEventListener('productsLoadFailed', (e) => {
	showNotification(e.detail)
})
sessionContainer.addEventListener('userInfoNotFounded', (e) => showNotification(e.detail))

const sessionNotification = await getSessionNotification('sessionNotification')
if (sessionNotification) {
	showNotification(sessionNotification)
	removeSessionNotification('sessionNotification')
}

sessionController(sessionContainer)
productsListController(productsContainer)
newProductController(newProductActionContainer, modal)
