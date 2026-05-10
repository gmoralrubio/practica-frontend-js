import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { createNewProduct } from './new-product-model.js'
import { createNewProductAction, createNewProductForm } from './new-product-view.js'

export const newProductController = (actionContainer, modalContainer) => {
	const token = localStorage.getItem('token')

	if (!token) return

	const newProductAction = createNewProductAction()
	const newProductForm = createNewProductForm()

	actionContainer.appendChild(newProductAction)
	modalContainer.appendChild(newProductForm)

	const newProductBtn = actionContainer.querySelector('.new-product-btn')
	const closeModalBtn = newProductForm.querySelector('.close-modal-btn')

	newProductBtn.addEventListener('click', () =>
		handleNewProductBtnClicked(actionContainer),
	)
	closeModalBtn.addEventListener('click', () =>
		handleCloseModalClicked(actionContainer),
	)
	newProductForm.addEventListener('submit', async (e) => {
		handleFormSubmit(e, newProductForm, actionContainer)
	})
}

const handleFormSubmit = async (e, form, container) => {
	e.preventDefault()

	const formData = new FormData(form)

	const newProduct = {
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
		const productCreationStarted = new CustomEvent('productCreationStarted')
		container.dispatchEvent(productCreationStarted)

		await createNewProduct(newProduct)

		handleProductCreationSucceeded(container)
		form.reset()
	} catch (error) {
		handleProductCreationFailed(container)
	} finally {
		const productCreationEnded = new CustomEvent('productCreationEnded')
		container.dispatchEvent(productCreationEnded)
	}
}

const handleNewProductBtnClicked = (container) => {
	const newProductBtnClicked = new CustomEvent('newProductBtnClicked')
	container.dispatchEvent(newProductBtnClicked)
}

const handleCloseModalClicked = (container) => {
	const closeModalBtnClicked = new CustomEvent('closeModalBtnClicked')
	container.dispatchEvent(closeModalBtnClicked)
}

const handleProductCreationFailed = (container) => {
	const productCreationFailed = new CustomEvent('productCreationFailed', {
		detail: {
			message: 'No ha sido posible añadir el producto.',
			status: NOTIFICATION_STATUS.error,
		},
	})
	container.dispatchEvent(productCreationFailed)
}

const handleProductCreationSucceeded = (container) => {
	const productCreationSucceeded = new CustomEvent('productCreationSucceeded', {
		detail: {
			message: 'Producto creado correctamente',
			status: NOTIFICATION_STATUS.success,
		},
	})
	container.dispatchEvent(productCreationSucceeded)
}
