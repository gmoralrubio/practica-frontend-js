import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { setSessionNotification } from '../../../shared/session-notification/session-notification-controller.js'
import { deleteProduct } from './delete-product-model.js'
import { createDeleteProductForm } from './delete-product-view.js'

export const deleteProductController = (modalContainer, product) => {
	const deleteProductForm = createDeleteProductForm()
	const closeModalBtn = deleteProductForm.querySelector('.close-modal-btn')
	closeModalBtn.addEventListener('click', () => handleCloseModalClicked(modalContainer))

	deleteProductForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		try {
			const productDeletionStarted = new CustomEvent('productDeletionStarted')
			modalContainer.dispatchEvent(productDeletionStarted)

			await deleteProduct(product.id)
			handleProductDeletionSucceeded()
		} catch (error) {
			handleProductDeletionFailed(modalContainer)
			console.log(error)
		} finally {
			const productDeletionEnded = new CustomEvent('productDeletionEnded')
			modalContainer.dispatchEvent(productDeletionEnded)
		}
	})

	modalContainer.appendChild(deleteProductForm)
}

const removePreviousForm = (container) => {
	const form = container.querySelector('.delete-product-form')
	form?.remove()
}

const handleCloseModalClicked = (container) => {
	removePreviousForm(container)
	const closeModalBtnClicked = new CustomEvent('closeModalBtnClicked')
	container.dispatchEvent(closeModalBtnClicked)
}

const handleProductDeletionSucceeded = () => {
	setSessionNotification({
		message: 'Producto Eliminado correctamente.',
		status: NOTIFICATION_STATUS.success,
	})

	window.location = 'index.html'
}

const handleProductDeletionFailed = (container) => {
	const productDeletionFailed = new CustomEvent('productDeletionFailed', {
		detail: {
			message: 'No ha sido posible eliminar el producto.',
			status: NOTIFICATION_STATUS.error,
		},
	})
	container.dispatchEvent(productDeletionFailed)
}
