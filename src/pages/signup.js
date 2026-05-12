import { loginUser } from '../modules/auth/login/login-model.js'
import { NOTIFICATION_STATUS } from '../shared/notification/notification-config.js'
import { notificationController } from '../shared/notification/notification-controller.js'
import { signupController } from '../modules/auth/signup/signup-controller.js'
import { loaderController } from '../shared/loader/loader-controller.js'
import { sessionController } from '../modules/session/session-controller.js'

const notificationContainer = document.querySelector('.notification-container')
const loaderContainer = document.querySelector('.loader-container')
const sessionContainer = document.querySelector('.session-container')
const signupForm = document.querySelector('#signup-form')

const { showNotification } = notificationController(notificationContainer)
const { showLoader, hideLoader } = loaderController()

signupForm.addEventListener('userSignupStarted', () => {
	signupForm.classList.add('hidden')
	showLoader(loaderContainer)
})
signupForm.addEventListener('userSignupEnded', () => {
	signupForm.classList.remove('hidden')
	hideLoader(loaderContainer)
})

signupForm.addEventListener('userCreated', async (e) => {
	try {
		const token = await loginUser(e.detail.username, e.detail.password)
		localStorage.setItem('token', token)
		window.location = 'index.html'
	} catch (error) {
		showNotification(notificationContainer, {
			message: error,
			status: NOTIFICATION_STATUS.error,
		})
	}
})
signupForm.addEventListener('userNotCreated', (e) =>
	showNotification(notificationContainer, e.detail),
)

sessionController(sessionContainer)
signupController(signupForm)
