import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { createNewProduct } from './new-product-model.js'
import { createNewProductAction, createNewProductForm } from './new-product-view.js'

export const newProductController = (newProductActionContainer, modal) => {
	const token = localStorage.getItem('token')

	if (token) {
		const newProductAction = createNewProductAction()
		newProductActionContainer.appendChild(newProductAction)
		const newProductBtn = newProductActionContainer.querySelector('#new-product-btn')
		// Los métodos showModal() y close() los proporciona DaisyUI (https://daisyui.com/components/modal/#method-1-html-dialog-element-recommended)
		newProductBtn.addEventListener('click', () => modal.showModal())

		const modalContainer = modal.querySelector('.modal-container')
		const newProductForm = createNewProductForm()

		const closeModalBtn = newProductForm.querySelector('.close-modal-btn')
		closeModalBtn.addEventListener('click', () => modal.close())

		newProductForm.addEventListener('submit', async (e) => {
			e.preventDefault()

			const form = new FormData(newProductForm)

			const newProduct = {
				name: form.get('product-name'),
				price: form.get('product-price'),
				category: form.get('product-category'),
				description: form.get('product-description'),
				image: form.get('product-image'),
			}

			try {
				const productCreationStarted = new CustomEvent('productCreationStarted')
				newProductActionContainer.dispatchEvent(productCreationStarted)
				await createNewProduct(newProduct)
				handleProductCreationSucceeded(newProductActionContainer)
			} catch (error) {
				handleProductCreationFailed(newProductActionContainer, error)
			} finally {
				const productCreationEnded = new CustomEvent('productCreationEnded')
				newProductActionContainer.dispatchEvent(productCreationEnded)
				newProductForm.reset()
				modal.close()
			}
		})

		modalContainer.appendChild(newProductForm)
	}
}

const handleProductCreationFailed = (newProductActionContainer, error) => {
	const productCreationFailed = new CustomEvent('productCreationFailed', {
		detail: {
			message: error,
			status: NOTIFICATION_STATUS.error,
		},
	})
	newProductActionContainer.dispatchEvent(productCreationFailed)
}
const handleProductCreationSucceeded = (newProductActionContainer) => {
	const productCreationSucceeded = new CustomEvent('productCreationSucceeded', {
		detail: {
			message: 'Producto creado correctamente',
			status: NOTIFICATION_STATUS.success,
		},
	})
	newProductActionContainer.dispatchEvent(productCreationSucceeded)
}
