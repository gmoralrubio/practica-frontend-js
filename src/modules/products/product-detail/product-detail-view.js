import { formatNumberToEuro } from '../../../utils/utils.js'

export const createProductDetail = (product) => {
	const readableDate = new Date(product.updatedAt)
	const readablePrice = formatNumberToEuro(product.price)

	const productDetail = document.createElement('div')
	productDetail.classList.add('max-w-4xl', 'mx-auto')
	productDetail.innerHTML = /*html*/ `
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

                <div class="product-action-container mt-8 flex gap-3">
                  <!-- <button class="btn btn-primary flex-1">Editar</button>
                  <button class="btn btn-error">Eliminar</button> -->
                </div>
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

export const createDeleteProductBtn = () => {
	const deleteProductBtn = document.createElement('button')
	deleteProductBtn.classList.add('btn', 'btn-error')
	deleteProductBtn.textContent = 'Eliminar'
	return deleteProductBtn
}

export const createEditProductBtn = () => {
	const editProductBtn = document.createElement('button')
	editProductBtn.classList.add('btn', 'btn-primary', 'flex-1')
	editProductBtn.textContent = 'Editar'
	return editProductBtn
}
