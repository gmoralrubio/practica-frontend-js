import { notificationController } from './notification/notification-controller.js'
import { signupController } from './signup/signup-controller.js'

const signupForm = document.querySelector('#signup-form')
const notificationContainer = document.querySelector('.notification-container')

const { showNotification } = notificationController(notificationContainer)

signupForm.addEventListener('emailNotValid', (e) => handleNotValidField(e))
signupForm.addEventListener('passwordMismatch', (e) => handleNotValidField(e))
signupForm.addEventListener('userCreated', (e) => showNotification(e.detail))
signupForm.addEventListener('userNotCreated', (e) => showNotification(e.detail))

signupController(signupForm)

const handleNotValidField = (e) => {
	const { hintContainer, message } = e.detail
	hintContainer.textContent = message
}
