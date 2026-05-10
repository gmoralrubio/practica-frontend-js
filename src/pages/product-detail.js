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

const { showLoader, hideLoader } = loaderController()
const { showNotification } = notificationController()

productDetailContainer.addEventListener('productLoadStarted', showLoader(loaderContainer))
productDetailContainer.addEventListener('productLoadEnded', hideLoader(loaderContainer))
productDetailContainer.addEventListener('productLoadFailed', (e) => {
	showNotification(notificationContainer, e.detail)
})
productDetailContainer.addEventListener('userDataFailed', (e) => {
	showNotification(notificationContainer, e.detail)
})

productDetailContainer.addEventListener('editPoductBtnClicked', (e) => {
	modal.showModal()
})
productDetailContainer.addEventListener('removeProductBtnClicked', (e) => {
	modal.showModal()
})

const sessionNotification = await getSessionNotification('sessionNotification')
if (sessionNotification) {
	showNotification(notificationContainer, sessionNotification)
	removeSessionNotification('sessionNotification')
}

sessionController(sessionContainer)
productDetailController(productDetailContainer, getLoggedUserInfo)
