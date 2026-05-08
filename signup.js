import { loginUser } from './login/login-model.js'
import { NOTIFICATION_STATUS } from './notification/notification-config.js'
import { notificationController } from './notification/notification-controller.js'
import { signupController } from './signup/signup-controller.js'
import { loaderController } from './loader/loader-controller.js'

const notificationContainer = document.querySelector('.notification-container')
const loaderContainer = document.querySelector('.loader-container')
const signupForm = document.querySelector('#signup-form')

const { showNotification } = notificationController(notificationContainer)
const { showLoader, hideLoader } = loaderController(loaderContainer)

signupForm.addEventListener('userSignupStarted', showLoader)
signupForm.addEventListener('userSignupEnded', hideLoader)
signupForm.addEventListener('emailNotValid', (e) => handleNotValidField(e))
signupForm.addEventListener('passwordMismatch', (e) => handleNotValidField(e))
signupForm.addEventListener('userCreated', async (e) => {
	try {
		const token = await loginUser(e.detail.username, e.detail.password)
		localStorage.setItem('token', token)
		window.location = '/'
	} catch (error) {
		showNotification({
			message: error,
			status: NOTIFICATION_STATUS.error,
		})
	}
})
signupForm.addEventListener('userNotCreated', (e) => showNotification(e.detail))

signupController(signupForm)

const handleNotValidField = (e) => {
	const { hintContainer, message } = e.detail
	hintContainer.textContent = message
}
