export const createProductList = (product) => {
	const productElement = document.createElement('div')
	productElement.classList.add('card', 'bg-base-100', 'min-w-96', 'shadow-sm')
	productElement.innerHTML = `
	<figure class="relative">
		<div class="absolute top-4 right-4 badge badge-soft badge-secondary">
			${product.category}
		</div>
		<img class="aspect-square object-cover"
		src="${product.image}"
		alt="${product.name}" />
	</figure>
	<div class="card-body gap-3">
		<h2 class="card-title">${product.name}</h2>
		<p>${product.description}</p>
		<p class="text-lg">${product.price}€</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary">Ver producto</button>
		</div>
	</div>`
	return productElement
}

export const createEmptyProductList = () => {
	const emptyProductList = document.createElement('div')
	emptyProductList.classList.add('hero', 'min-h-screen')
	emptyProductList.innerHTML = `
		<div class="hero-content text-center">
			<div class="max-w-md">
			<h1 class="text-5xl font-bold">No hay ningún producto añadido</h1>
			<p class="py-6 text-balance">
				Para poder añadir productos, primero tienes que iniciar sesión
			</p>
			<a href="/login.html" class="btn btn-primary">Iniciar sesión</a>
			</div>
		</div>`

	return emptyProductList
}
