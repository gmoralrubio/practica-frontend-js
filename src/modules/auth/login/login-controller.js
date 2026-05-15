import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { setSessionNotification } from '../../../shared/session-notification/session-notification-controller.js'
import { loginUser } from './login-model.js'

export const loginController = (loginForm) => {
	loginForm.addEventListener('submit', async (e) => {
		e.preventDefault()

		const form = new FormData(loginForm)
		const email = form.get('email')
		const password = form.get('password')

		try {
			const userLoginStarted = new CustomEvent('userLoginStarted')
			loginForm.dispatchEvent(userLoginStarted)

			const token = await loginUser(email, password)
			localStorage.setItem('token', token)
			setSessionNotification({
				message: 'Inicio de sesión exitoso.',
				status: NOTIFICATION_STATUS.success,
			})

			window.location = 'index.html'
		} catch (error) {
			const userLoginFailed = new CustomEvent('userLoginFailed', {
				detail: {
					message: error.message || 'Error al iniciar sesión',
					status: NOTIFICATION_STATUS.error,
				},
			})
			loginForm.dispatchEvent(userLoginFailed)
		} finally {
			const userLoginEnded = new CustomEvent('userLoginEnded')
			loginForm.dispatchEvent(userLoginEnded)
		}
	})
}
