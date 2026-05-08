export const getLoggedUserInfo = async () => {
	const url = 'http://localhost:8000/auth/me'
	const token = localStorage.getItem('token')

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	const data = await response.json()
	return data
}
