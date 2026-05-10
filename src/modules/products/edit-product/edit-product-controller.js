import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { updatedProduct } from './edit-product-model.js'
import { createEditProductForm } from './edit-product-view.js'

export const editProductController = (modalContainer, product) => {
	const editProductForm = createEditProductForm(product)
	const closeModalBtn = editProductForm.querySelector('.close-modal-btn')

	closeModalBtn.addEventListener('click', () => handleCloseModalClicked(modalContainer))

	editProductForm.addEventListener('submit', async (e) => {
		e.preventDefault()

		const formData = new FormData(editProductForm)

		const updatedContent = {
			name: formData.get('product-name'),
			price: formData.get('product-price'),
			category: formData.get('product-category'),
			description: formData.get('product-description'),
			image:
				formData.get('product-image') === ''
					? 'https://placehold.co/600?text=Image+not+provided'
					: formData.get('product-image'),
		}

		try {
			const productEditionStarted = new CustomEvent('productEditionStarted')
			modalContainer.dispatchEvent(productEditionStarted)

			await updatedProduct(product.id, updatedContent)

			handleProductEditionSucceeded(modalContainer)
		} catch (error) {
			handleProductEditionFailed(modalContainer)
		} finally {
			const productEditionEnded = new CustomEvent('productEditionEnded')
			modalContainer.dispatchEvent(productEditionEnded)
		}
	})

	modalContainer.appendChild(editProductForm)
}

const removePreviousForm = (container) => {
	const form = container.querySelector('.edit-product-form')
	form?.remove()
}

const handleCloseModalClicked = (container) => {
	removePreviousForm(container)
	const closeModalBtnClicked = new CustomEvent('closeModalBtnClicked')
	container.dispatchEvent(closeModalBtnClicked)
}

const handleProductEditionFailed = (container) => {
	const productEditionFailed = new CustomEvent('productEditionFailed', {
		detail: {
			message: 'No ha sido posible editar el producto.',
			status: NOTIFICATION_STATUS.error,
		},
	})
	container.dispatchEvent(productEditionFailed)
}

const handleProductEditionSucceeded = (container) => {
	removePreviousForm(container)
	const productEditionSucceeded = new CustomEvent('productEditionSucceeded', {
		detail: {
			message: 'Producto editado correctamente',
			status: NOTIFICATION_STATUS.success,
		},
	})
	container.dispatchEvent(productEditionSucceeded)
}
