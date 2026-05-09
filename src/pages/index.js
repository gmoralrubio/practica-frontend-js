import { newProductController } from '../modules/products/new-product/new-product-controller.js'
import { loaderController } from '../shared/loader/loader-controller.js'
import { notificationController } from '../shared/notification/notification-controller.js'
import { productsListController } from '../modules/products/products-list/products-list-controller.js'
import {
	getSessionNotification,
	removeSessionNotification,
} from '../shared/session-notification/session-notification-controller.js'
import { sessionController } from '../modules/session/session-controller.js'
import { modalController } from '../shared/modal/modal-controller.js'

const loaderContainer = document.querySelector('.loader-container')
const notificationContainer = document.querySelector('.notification-container')
const sessionContainer = document.querySelector('.session-container')
const productsContainer = document.querySelector('.products-container')
const newProductActionContainer = document.querySelector('.new-product-action-container')
const modalContainer = document.querySelector('.modal-container')

const { showLoader, hideLoader } = loaderController()
const { showNotification } = notificationController()
const { openModal, closeModal } = modalController(modalContainer)

const modalLoaderContainer = document.querySelector('.modal-loader-container')
const modalNotificationContainer = document.querySelector('.modal-notification-container')

sessionContainer.addEventListener('userInfoNotFounded', (e) =>
	showNotification(notificationContainer, e.detail),
)

// Product list eventos
productsContainer.addEventListener('productsLoadStarted', () =>
	showLoader(loaderContainer),
)
productsContainer.addEventListener('productsLoadEnded', () => hideLoader(loaderContainer))
productsContainer.addEventListener('productsLoadFailed', (e) => {
	showNotification(notificationContainer, e.detail)
})

// New product eventos
newProductActionContainer.addEventListener('newProductBtnClicked', openModal)
newProductActionContainer.addEventListener('closeModalBtnClicked', closeModal)
newProductActionContainer.addEventListener('productCreationStarted', () => {
	showLoader(modalLoaderContainer)
})
newProductActionContainer.addEventListener('productCreationEnded', () => {
	hideLoader(modalLoaderContainer)
})
newProductActionContainer.addEventListener('productCreationFailed', (e) =>
	showNotification(modalNotificationContainer, e.detail),
)
newProductActionContainer.addEventListener('productCreationSucceeded', (e) => {
	closeModal()
	showNotification(notificationContainer, e.detail)
	productsListController(productsContainer)
})

const sessionNotification = await getSessionNotification('sessionNotification')
if (sessionNotification) {
	showNotification(notificationContainer, sessionNotification)
	removeSessionNotification('sessionNotification')
}

sessionController(sessionContainer)
productsListController(productsContainer)
newProductController(newProductActionContainer)
