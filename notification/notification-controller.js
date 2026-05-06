import {
	createTemporalNotificationElement,
	createPermanentNotificationElement,
} from './notification-view.js'

export const notificationController = (notificationContainer) => {
	const showTemporalNotification = (notificationInfo) => {
		const temporalNotification = createTemporalNotificationElement(notificationInfo)
		notificationContainer.appendChild(temporalNotification)
		setTimeout(() => {
			temporalNotification.remove()
		}, 5000)
	}

	const showPermanentNotification = (notificationInfo) => {
		const permanentNotification = createPermanentNotificationElement(notificationInfo)
		notificationContainer.appendChild(permanentNotification)
	}

	return { showTemporalNotification, showPermanentNotification }
}
