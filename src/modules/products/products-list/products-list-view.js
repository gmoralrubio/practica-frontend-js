import { formatNumberToEuro } from '../../../utils/utils.js'

export const createProductList = (product) => {
	const readablePrice = formatNumberToEuro(product.price)

	const productElement = document.createElement('div')
	productElement.classList.add('card', 'bg-base-100', 'shadow-sm')
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
		<p class="text-lg">${readablePrice}</p>
		<div class="card-actions justify-end">
			<a href="product-detail.html?id=${product.id}" class="btn btn-primary">Ver producto</a>
		</div>
	</div>`
	return productElement
}

export const createProductListWrapper = () => {
	const productListWrapper = document.createElement('div')
	productListWrapper.classList.add('products-wrapper')
	return productListWrapper
}

export const createEmptyProductList = () => {
	const emptyProductList = document.createElement('div')
	emptyProductList.classList.add('hero')
	emptyProductList.innerHTML = `
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">No se ha encontrado ningún producto.</h1>
				<p class="py-6 text-xl text-balance">Añade productos o utiliza otro término de búsqueda.</p>
			</div>
		</div>`

	return emptyProductList
}
