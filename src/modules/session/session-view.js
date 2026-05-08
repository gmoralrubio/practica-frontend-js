export const createAuthenticatedSession = (username) => {
	return `
		<span class="text-sm text-taupe-500 font-medium">¡Hola ${username}!</span>
		<button class="btn btn-soft btn-sm btn-secondary" id="logout-btn">Cerrar sesión</button>
		`
}

export const createUnauthenticatedSession = () => {
	return `
		<a href="signup.html" class="btn btn-sm btn-soft btn-primary">
			Registrarse
		</button>
		<a href="login.html" class="btn btn-sm btn-primary">
			Iniciar sesión
		</button>
	`
}
