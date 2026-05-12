export const createDeleteProductForm = () => {
	const deleteProductForm = document.createElement('form')
	deleteProductForm.classList.add('delete-product-form')
	deleteProductForm.innerHTML = /*html*/ `
		<p class="text-lg font-semibold">¿Estás seguro que deseas eliminar el producto?</p>
		<p class="py-4">Esta decisión es irreversible</p>
		<div>
			<button class="btn btn-error delete-product-btn">Eliminar producto</button>
			<button class="btn btn-ghost close-modal-btn" type="button">Volver</button>
		</div>
	`
	return deleteProductForm
}
