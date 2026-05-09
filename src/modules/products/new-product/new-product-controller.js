import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { createNewProduct } from './new-product-model.js'
import { createNewProductAction, createNewProductForm } from './new-product-view.js'

export const newProductController = (newProductActionContainer) => {
	const token = localStorage.getItem('token')

	if (token) {
		const newProductAction = createNewProductAction()
		newProductActionContainer.appendChild(newProductAction)
		const newProductBtn = newProductActionContainer.querySelector('.new-product-btn')

		newProductBtn.addEventListener('click', () => {
			const newProductBtnClicked = new CustomEvent('newProductBtnClicked')
			newProductActionContainer.dispatchEvent(newProductBtnClicked)
		})

		const newProductForm = createNewProductForm()

		const closeModalBtn = newProductForm.querySelector('.close-modal-btn')
		closeModalBtn.addEventListener('click', () => {
			const closeModalBtnClicked = new CustomEvent('closeModalBtnClicked')
			newProductActionContainer.dispatchEvent(closeModalBtnClicked)
		})

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

				newProductForm.reset()
			} catch (error) {
				handleProductCreationFailed(newProductActionContainer)
			} finally {
				const productCreationEnded = new CustomEvent('productCreationEnded')
				newProductActionContainer.dispatchEvent(productCreationEnded)
			}
		})

		const modalContainer = document.querySelector('.modal-content')
		modalContainer.appendChild(newProductForm)
	}
}

const handleProductCreationFailed = (newProductActionContainer) => {
	const productCreationFailed = new CustomEvent('productCreationFailed', {
		detail: {
			message: 'No ha sido posible añadir el producto.',
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
