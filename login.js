import { loaderController } from './loader/loader-controller.js'
import { loginController } from './login/login-controller.js'
import { notificationController } from './notification/notification-controller.js'

const notificationContainer = document.querySelector('.notification-container')
const loaderContainer = document.querySelector('.loader-container')
const loginForm = document.querySelector('#login-form')

const { showNotification } = notificationController(notificationContainer)
const { showLoader, hideLoader } = loaderController(loaderContainer)

loginForm.addEventListener('userLoginStarted', showLoader)
loginForm.addEventListener('userLoginEnded', hideLoader)
loginForm.addEventListener('userLoginFailed', (e) => showNotification(e.detail))

loginController(loginForm)
