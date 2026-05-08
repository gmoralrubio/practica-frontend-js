import { NOTIFICATION_STATUS } from '../notification/notification-config.js'
import { setSessionNotification } from '../session-notification/session-notification-controller.js'
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
		const emailNotValid = new CustomEvent('emailNotValid', {
			detail: {
				message: 'El email no tiene un formato válido',
				hintContainer,
			},
		})
		signupForm.dispatchEvent(emailNotValid)
		return false
	}
	return true
}

const passwordsMatches = (password, passwordConfirm, signupForm) => {
	if (password !== passwordConfirm) {
		const hintContainer = signupForm.querySelector('#password-confirm-hint')
		const passwordMismatch = new CustomEvent('passwordMismatch', {
			detail: {
				message: 'Las contraseñas no coinciden',
				hintContainer,
			},
		})
		signupForm.dispatchEvent(passwordMismatch)
		return false
	}
	return true
}
