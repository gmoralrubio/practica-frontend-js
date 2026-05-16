import { formatNumberToEuro } from '../../../utils/utils.js'

export const createProductDetail = (product) => {
	const readableDate = new Date(product.updatedAt)
	const readablePrice = formatNumberToEuro(product.price)
	const readableTags = {
		tech: 'Tecnología',
		sport: 'Deportes',
		home: 'Hogar',
	}

	const productDetail = document.createElement('div')
	productDetail.classList.add('max-w-4xl', 'mx-auto')
	productDetail.innerHTML = `
		<div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div class="flex justify-center">
                  <img
                    src="${product.image}"
                    alt="${product.name}"
					class="aspect-square object-cover rounded-lg"
                  >
              </div>

              <div class="flex flex-col justify-between">
                <div>
                  <div class="mb-4">
                    <span class="badge badge-soft badge-secondary badge-lg">
						${product.category}
					</span>
                  </div>

                  <h1 class="card-title text-3xl font-bold mb-4">
                    ${product.name}
                  </h1>

                  <div class="mb-6">
                    <p class="text-3xl text-primary">
                    	${readablePrice}
                    </p>
                  </div>
				  
                  <div class="mb-6">
                    <h2 class="text-md font-medium mb-2">Descripción</h2>
                    <p class="text-base-content/80 leading-relaxed">
						${product.description}
                    </p>
                  </div>
				  <div class="mb-6 flex gap-2">
				     ${product.tags.map((tag) => `<div class="badge badge-outline badge-accent">${readableTags[tag]}</div>`).join('')}
				  </div>
                  <div class="divider"></div>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p class="text-base-content/60">Propietario</p>
                      <p class="font-semibold">${product.user.username}</p>
                    </div>
                    <div>
                      <p class="text-base-content/60">Publicado</p>
                      <p class="font-semibold">${readableDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div class="product-action-container mt-8 flex gap-3"></div>
              </div>

            </div>
          </div>
        </div>

        <div class="mt-6">
          <a
            href="index.html"
            class="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al listado
          </a>
        </div> `

	return productDetail
}
export const createEditProductBtn = () => {
	const editProductBtn = document.createElement('button')
	editProductBtn.classList.add('btn', 'btn-primary', 'flex-1')
	editProductBtn.textContent = 'Editar'
	return editProductBtn
}
export const createEditProductForm = (product) => {
	const editProductForm = document.createElement('form')
	editProductForm.classList.add('edit-product-form', 'detail-product-form')
	editProductForm.innerHTML = `
		<fieldset class="fieldset">
			<label
				for="product-name"
				class="label"
			>Nombre de producto</label>
			<input
				type="text"
				name="product-name"
				id="product-name"
				class="input w-full"
				placeholder="Nombre de producto"
				value="${product.name}"
				required
			/>
			<span
				class="hint text-red-500"
				id="product-name-hint"
			></span>
		</fieldset>

		<div class="flex gap-4">
			<fieldset class="fieldset flex-1">
				<label
					for="product-price"
					class="label"
				>Precio</label>
				<input
					type="number"
					name="product-price"
					id="product-price"
					step="0.01"
					class="input w-full"
					placeholder="Precio"
					min="1"
					value="${product.price}"
					required
				/>
				<span
					class="hint text-red-500"
					id="product-price-hint"
				></span>
			</fieldset>

			<fieldset class="fieldset flex-1">
				<label
					for="product-category"
					class="label"
				>Categoría</label>
				<div class="flex gap-4 mt-2">
					<label>
						<span class="text-sm mr-2">Compra</span>
						<input
							type="radio"
							name="product-category"
							value="compra"
							class="radio radio-xs radio-primary"
							${product.category === 'compra' ? 'checked' : ''}
						/>
					</label>
					<label>
						<span class="text-sm mr-2">Venta</span>
						<input
							type="radio"
							name="product-category"
							value="venta"
							class="radio radio-xs radio-primary"
							${product.category === 'venta' ? 'checked' : ''}

						/>
					</label>
					<span
						class="hint text-red-500"
						id="product-category-hint"
					></span>
				</div>
			</fieldset>
		</div>

		<fieldset class="fieldset">
			<label
				for="product-description"
				class="label"
			>Descripción</label>
			<textarea
				class="textarea h-24 w-full"
				placeholder="Descripción"
				id="product-description"
				name="product-description"
				required
			>${product.description}</textarea>
			<span
				class="hint text-red-500"
				id="product-description-hint"
			></span>
		</fieldset>

		<fieldset class="fieldset">
			<label
				for="product-image"
				class="label"
			>Imagen (opcional)</label>
						
			<input
				type="text"
				name="product-image"
				id="product-image"
				placeholder="https://"
				class="input w-full"
				value=${product.image}
			/>

			<span
				class="hint text-red-500"
				id="product-image-hint"
			></span>
		</fieldset>

		<div class="mt-6">
			<button
				class="btn btn-primary"
				type="submit"
			>Guardar producto</button>
			<button
				class="btn btn-ghost close-modal-btn"
				type="button"
			>Volver</button>
		</div>
	`

	return editProductForm
}

export const createDeleteProductBtn = () => {
	const deleteProductBtn = document.createElement('button')
	deleteProductBtn.classList.add('btn', 'btn-error')
	deleteProductBtn.textContent = 'Eliminar'
	return deleteProductBtn
}

export const createDeleteProductForm = () => {
	const deleteProductForm = document.createElement('form')
	deleteProductForm.classList.add('delete-product-form', 'detail-product-form')
	deleteProductForm.innerHTML = `
		<p class="text-lg font-semibold">¿Estás seguro que deseas eliminar el producto?</p>
		<p class="py-4">Esta decisión es irreversible</p>
		<div>
			<button class="btn btn-error delete-product-btn">Eliminar producto</button>
			<button class="btn btn-ghost close-modal-btn" type="button">Volver</button>
		</div>
	`
	return deleteProductForm
}
