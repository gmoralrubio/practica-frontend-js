import { NOTIFICATION_VARIANTS } from './notification-config.js'

export const createTemporalNotificationElement = ({ message, status }) => {
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

export const createPermanentNotificationElement = ({ title, message, action }) => {
	const permanentNotification = document.createElement('div')
	permanentNotification.classList.add('hero', 'min-h-screen')
	permanentNotification.innerHTML = `
		<div class="hero-content text-center">
			<div class="max-w-md">
			<h1 class="text-5xl font-bold">${title}</h1>
			<p class="py-6 text-balance">
				${message}
			</p>
			<a href="${action.url}" class="btn btn-primary">${action.textBtn}</a>
			</div>
		</div>`

	return permanentNotification
}
