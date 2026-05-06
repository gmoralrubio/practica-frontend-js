export const createUser = async (email, password) => {
	const url = 'http://localhost:8000/auth/register'

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			username: email,
			password,
		}),
	})

	if (!response.ok) {
		const data = await response.json()
		throw new Error(data.message)
	}
}
