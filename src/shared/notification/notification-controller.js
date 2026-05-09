import { createNotification } from './notification-view.js'

export const notificationController = () => {
	const showNotification = (notificationContainer, notificationInfo) => {
		const temporalNotification = createNotification(notificationInfo)
		notificationContainer.appendChild(temporalNotification)
		setTimeout(() => {
			temporalNotification.remove()
		}, 5000)
	}

	return { showNotification }
}
