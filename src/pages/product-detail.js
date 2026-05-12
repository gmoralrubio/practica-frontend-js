// import { deleteProductController } from '../modules/products/delete-product/delete-product-controller.js'
// import { editProductController } from '../modules/products/edit-product/edit-product-controller.js'
import { productDetailController } from '../modules/products/product-detail/product-detail-controller.js'
import { sessionController } from '../modules/session/session-controller.js'
import { getLoggedUserInfo } from '../modules/session/session-model.js'
import { loaderController } from '../shared/loader/loader-controller.js'
import { notificationController } from '../shared/notification/notification-controller.js'
import {
	getSessionNotification,
	removeSessionNotification,
} from '../shared/session-notification/session-notification-controller.js'

const loaderContainer = document.querySelector('.loader-container')
const notificationContainer = document.querySelector('.notification-container')
const sessionContainer = document.querySelector('.session-container')
const productDetailContainer = document.querySelector('.product-detail-container')
const modal = document.querySelector('.modal')
const modalNotificationContainer = modal.querySelector('.modal-notification-container')
const modalLoaderContainer = modal.querySelector('.modal-loader-container')
const modalInnerContainer = modal.querySelector('.modal-inner-container')

const { showLoader, hideLoader } = loaderController()
const { showNotification } = notificationController()

// Product details
productDetailContainer.addEventListener('productLoadStarted', showLoader(loaderContainer))
productDetailContainer.addEventListener('productLoadEnded', hideLoader(loaderContainer))
productDetailContainer.addEventListener('productLoadFailed', (e) => {
	showNotification(notificationContainer, e.detail)
})
productDetailContainer.addEventListener('userDataFailed', (e) => {
	showNotification(notificationContainer, e.detail)
})

productDetailContainer.addEventListener('actionProductBtnClicked', (e) => {
	modal.showModal()
})

modalInnerContainer.addEventListener('productOperationStarted', () => {
	const form = modal.querySelector('.detail-product-form')
	form?.classList.add('hidden')
	showLoader(modalLoaderContainer)
})

modalInnerContainer.addEventListener('productOperationEnded', () => {
	const form = modal.querySelector('.detail-product-form')
	form?.classList.remove('hidden')
	hideLoader(modalLoaderContainer)
})

modalInnerContainer.addEventListener('productOperationFailed', (e) =>
	showNotification(modalNotificationContainer, e.detail),
)

modalInnerContainer.addEventListener('productEditionSucceeded', (e) => {
	modal.close()
	showNotification(notificationContainer, e.detail)
	productDetailController(productDetailContainer, getLoggedUserInfo)
})

// Delete product
modalInnerContainer.addEventListener('productDeletionSucceeded', (e) => {
	modal.close()
})

modalInnerContainer.addEventListener('closeModalBtnClicked', () => modal.close())

const sessionNotification = await getSessionNotification('sessionNotification')
if (sessionNotification) {
	showNotification(notificationContainer, sessionNotification)
	removeSessionNotification('sessionNotification')
}

sessionController(sessionContainer)
productDetailController(productDetailContainer, getLoggedUserInfo)
