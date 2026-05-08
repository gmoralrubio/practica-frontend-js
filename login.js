import { loginController } from './login/login-controller.js'
import { notificationController } from './notification/notification-controller.js'

const notificationContainer = document.querySelector('.notification-container')
const loginForm = document.querySelector('#login-form')

const { showNotification } = notificationController(notificationContainer)

loginForm.addEventListener('userLoginFailed', (e) => showNotification(e.detail))

loginController(loginForm)
