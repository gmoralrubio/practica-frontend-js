export const createProductListElement = (product) => {
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

const createProductTypeBadge = (type) => {
	return ''
}
