import { createNotification } from './notification-view.js'

export const notificationController = (notificationContainer) => {
	const showNotification = (notificationInfo) => {
		const temporalNotification = createNotification(notificationInfo)
		notificationContainer.appendChild(temporalNotification)
		setTimeout(() => {
			temporalNotification.remove()
		}, 5000)
	}

	return { showNotification }
}
