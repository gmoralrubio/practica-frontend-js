import { NOTIFICATION_STATUS } from '../notification/notification-config.js'
import { loginUser } from './login-model.js'

export const loginController = (loginForm) => {
	loginForm.addEventListener('submit', async (e) => {
		e.preventDefault()

		const form = new FormData(loginForm)
		const email = form.get('email')
		const password = form.get('password')

		try {
			const token = await loginUser(email, password)
			localStorage.setItem('token', token)
			const userLoginSucceeded = new CustomEvent('userLoginSucceeded', {
				detail: {
					message:
						'Inicio de sesión exitoso. En breve serás redirigido a la página principal',
					status: NOTIFICATION_STATUS.success,
				},
			})
			loginForm.dispatchEvent(userLoginSucceeded)
			setTimeout(() => {
				window.location = '/'
			}, 4000)
		} catch (error) {
			console.log(error)

			const userLoginFailed = new CustomEvent('userLoginFailed', {
				detail: {
					message: error,
					status: NOTIFICATION_STATUS.error,
				},
			})
			loginForm.dispatchEvent(userLoginFailed)
		}
	})
}
