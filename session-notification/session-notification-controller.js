export const setSessionNotification = (notification) => {
	sessionStorage.setItem('sessionNotification', JSON.stringify(notification))
}

export const getSessionNotification = async () => {
	const sessionNotification = sessionStorage.getItem('sessionNotification')

	return JSON.parse(sessionNotification)
}

export const removeSessionNotification = () => {
	sessionStorage.removeItem('sessionNotification')
}
