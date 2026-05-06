import { createNotificationElement } from './notification-view.js'

export const notificationController = (notificationContainer) => {
	const showNotification = (message, type) => {
		const notificationElement = createNotificationElement(message, type)
		notificationContainer.appendChild(notificationElement)
		setTimeout(() => {
			notificationElement.remove()
		}, 5000)
	}

	return { showNotification }
}
