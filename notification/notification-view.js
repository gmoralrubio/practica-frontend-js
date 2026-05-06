import { NOTIFICATION_ICON, NOTIFICATION_VARIANTS } from './notification-config.js'

export const createNotificationElement = (message, type) => {
	const notificationElement = document.createElement('div')
	notificationElement.classList.add(...NOTIFICATION_VARIANTS[type])
	const iconElement = document.createElement('span')
	iconElement.innerHTML = NOTIFICATION_ICON[type] ?? ''
	const notificationMessage = document.createElement('span')
	notificationMessage.textContent = message

	notificationElement.appendChild(iconElement)
	notificationElement.appendChild(notificationMessage)

	return notificationElement
}
