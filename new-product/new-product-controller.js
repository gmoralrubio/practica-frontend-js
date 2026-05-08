import { createNewProductAction, createNewProductForm } from './new-product-view.js'

export const newProductController = (newProductActionContainer, modal) => {
	const token = localStorage.getItem('token')

	if (token) {
		const newProductAction = createNewProductAction()
		newProductActionContainer.appendChild(newProductAction)
		const newProductBtn = newProductActionContainer.querySelector('#new-product-btn')
		// El método showModal() y close() lo proporciona DaisyUI (https://daisyui.com/components/modal/#method-1-html-dialog-element-recommended)
		newProductBtn.addEventListener('click', () => modal.showModal())

		const modalContainer = modal.querySelector('.modal-container')
		const newProductForm = createNewProductForm()

		const closeModalBtn = newProductForm.querySelector('.close-modal-btn')
		closeModalBtn.addEventListener('click', () => modal.close())

		modalContainer.appendChild(newProductForm)
	}
}
