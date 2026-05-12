import { NOTIFICATION_STATUS } from '../../shared/notification/notification-config.js'
import { getLoggedUserInfo } from './session-model.js'
import {
	createAuthenticatedSession,
	createUnauthenticatedSession,
} from './session-view.js'

export const sessionController = async (sessionContainer) => {
	const token = localStorage.getItem('token')

	if (token) {
		try {
			const { username } = await getLoggedUserInfo()
			sessionContainer.innerHTML = createAuthenticatedSession(username)

			const logoutBtn = sessionContainer.querySelector('#logout-btn')
			logoutBtn.addEventListener('click', () => {
				localStorage.removeItem('token')
				window.location = 'index.html'
			})
		} catch (error) {
			localStorage.removeItem('token')
			sessionContainer.innerHTML = createUnauthenticatedSession()

			const userInfoNotFounded = new CustomEvent('userInfoNotFounded', {
				detail: {
					message: 'No ha sido posible obtener la información del usuario',
					status: NOTIFICATION_STATUS.error,
				},
			})
			sessionContainer.dispatchEvent(userInfoNotFounded)
		}
	} else {
		sessionContainer.innerHTML = createUnauthenticatedSession()
	}
}
