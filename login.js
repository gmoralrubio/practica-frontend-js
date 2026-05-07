import { loginController } from './login/login-controller.js'
import { notificationController } from './notification/notification-controller.js'

const notificationContainer = document.querySelector('.notification-container')
const loginForm = document.querySelector('#login-form')

const { showTemporalNotification } = notificationController(notificationContainer)

loginForm.addEventListener('userLoginSucceeded', (e) =>
	showTemporalNotification(e.detail),
)
loginForm.addEventListener('userLoginFailed', (e) => showTemporalNotification(e.detail))

loginController(loginForm)
