import { NOTIFICATION_VARIANTS } from './notification-config.js'

export const createNotification = ({ message, status }) => {
	const temporalNotification = document.createElement('div')
	temporalNotification.classList.add(...NOTIFICATION_VARIANTS[status].classes)

	const iconElement = document.createElement('span')
	iconElement.innerHTML = NOTIFICATION_VARIANTS[status].icon ?? ''

	const notificationMessage = document.createElement('span')
	notificationMessage.textContent = message

	temporalNotification.appendChild(iconElement)
	temporalNotification.appendChild(notificationMessage)

	return temporalNotification
}
