import { loaderController } from '../shared/loader/loader-controller.js'
import { loginController } from '../modules/auth/login/login-controller.js'
import { notificationController } from '../shared/notification/notification-controller.js'

const notificationContainer = document.querySelector('.notification-container')
const loaderContainer = document.querySelector('.loader-container')
const loginForm = document.querySelector('#login-form')

const { showNotification } = notificationController(notificationContainer)
const { showLoader, hideLoader } = loaderController()

loginForm.addEventListener('userLoginStarted', () => showLoader(loaderContainer))
loginForm.addEventListener('userLoginEnded', () => hideLoader(loaderContainer))
loginForm.addEventListener('userLoginFailed', (e) => showNotification(e.detail))

loginController(loginForm)
