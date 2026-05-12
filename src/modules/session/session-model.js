export const getLoggedUserInfo = async () => {
	const url = 'http://localhost:8000/auth/me'
	const token = localStorage.getItem('token')

	if (!token || token === 'null' || token === 'undefined') {
		throw new Error('Token inválido o no encontrado')
	}

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.message)
	}

	return data
}
