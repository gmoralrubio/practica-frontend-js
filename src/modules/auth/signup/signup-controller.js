import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { setSessionNotification } from '../../../shared/session-notification/session-notification-controller.js'
import { createUser } from './signup-model.js'

export const signupController = (signupForm) => {
	signupForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		resetHints(signupForm)

		const form = new FormData(signupForm)

		const email = form.get('email')
		const password = form.get('password')
		const passwordConfirm = form.get('password-confirm')

		if (
			isEmailValid(email, signupForm) &&
			passwordsMatches(password, passwordConfirm, signupForm)
		) {
			try {
				const userSignupStarted = new CustomEvent('userSignupStarted')
				signupForm.dispatchEvent(userSignupStarted)

				await createUser(email, password)
				const userCreated = new CustomEvent('userCreated', {
					detail: {
						username: email,
						password,
					},
				})
				signupForm.dispatchEvent(userCreated)

				setSessionNotification({
					message: 'Usuario creado con éxito.',
					status: NOTIFICATION_STATUS.success,
				})
			} catch (error) {
				const userNotCreated = new CustomEvent('userNotCreated', {
					detail: {
						message: error.message,
						status: NOTIFICATION_STATUS.error,
					},
				})
				signupForm.dispatchEvent(userNotCreated)
			} finally {
				const userSignupEnded = new CustomEvent('userSignupEnded')
				signupForm.dispatchEvent(userSignupEnded)
			}
		}
	})
}

const resetHints = (signupForm) => {
	const hints = signupForm.querySelectorAll('.hint')
	hints.forEach((hint) => (hint.textContent = ''))
}

const isEmailValid = (email, signupForm) => {
	const emailRegExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
	const validEmail = emailRegExp.test(email)

	if (!validEmail) {
		const hintContainer = signupForm.querySelector('#email-hint')
		hintContainer.textContent = 'El email no tiene un formato válido'

		return false
	}
	return true
}

const passwordsMatches = (password, passwordConfirm, signupForm) => {
	if (password !== passwordConfirm) {
		const hintContainer = signupForm.querySelector('#password-confirm-hint')
		hintContainer.textContent = 'Las contraseñas no coinciden'

		return false
	}
	return true
}
