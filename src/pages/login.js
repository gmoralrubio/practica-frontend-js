import { loaderController } from '../shared/loader/loader-controller.js'
import { loginController } from '../modules/auth/login/login-controller.js'
import { notificationController } from '../shared/notification/notification-controller.js'
import { sessionController } from '../modules/session/session-controller.js'

const notificationContainer = document.querySelector('.notification-container')
const loaderContainer = document.querySelector('.loader-container')
const sessionContainer = document.querySelector('.session-container')
const loginForm = document.querySelector('#login-form')

const { showNotification } = notificationController(notificationContainer)
const { showLoader, hideLoader } = loaderController()

loginForm.addEventListener('userLoginStarted', () => {
	loginForm.classList.add('hidden')
	showLoader(loaderContainer)
})
loginForm.addEventListener('userLoginEnded', () => {
	loginForm.classList.remove('hidden')
	hideLoader(loaderContainer)
})
loginForm.addEventListener('userLoginFailed', (e) =>
	showNotification(notificationContainer, e.detail),
)

sessionController(sessionContainer)

loginController(loginForm)
