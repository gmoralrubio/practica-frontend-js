import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { setSessionNotification } from '../../../shared/session-notification/session-notification-controller.js'
import { deleteProduct, getProductById, updateProduct } from './product-detail-model.js'
import {
	createDeleteProductBtn,
	createDeleteProductForm,
	createEditProductBtn,
	createEditProductForm,
	createProductDetail,
} from './product-detail-view.js'

export const productDetailController = async (container, getLoggedUserInfo) => {
	const searchParams = new URLSearchParams(window.location.search)
	const productId = searchParams.get('id')

	if (!productId) {
		window.location = 'index.html'
		return
	}
	container.innerHTML = ''
	try {
		const productLoadStarted = new CustomEvent('productLoadStarted')
		container.dispatchEvent(productLoadStarted)

		const product = await getProductById(productId)
		const productDetail = createProductDetail(product)
		container.appendChild(productDetail)

		handleUserActions(container, product, getLoggedUserInfo)
	} catch (error) {
		setSessionNotification({
			message: error.message || 'Error al obtener el producto',
			status: NOTIFICATION_STATUS.error,
		})
		window.location = 'index.html'
	} finally {
		const productLoadEnded = new CustomEvent('productLoadEnded')
		container.dispatchEvent(productLoadEnded)
	}
}

const handleUserActions = async (container, product, getLoggedUserInfo) => {
	const token = localStorage.getItem('token')
	const productUserId = product.userId

	if (!token) return
	try {
		const loggedUser = await getLoggedUserInfo()
		if (loggedUser.id === productUserId) {
			const actionContainer = container.querySelector('.product-action-container')
			const editProductBtn = createEditProductBtn()
			const deleteProductBtn = createDeleteProductBtn()

			editProductBtn.addEventListener('click', () => {
				handleEditProduct(product)
				handleActionBtnClicked(container)
			})
			deleteProductBtn.addEventListener('click', () => {
				handleDeleteProduct(product)
				handleActionBtnClicked(container)
			})

			actionContainer.appendChild(editProductBtn)
			actionContainer.appendChild(deleteProductBtn)
		}
	} catch (error) {
		const userDataFailed = new CustomEvent('userDataFailed', {
			detail: {
				message: error.message || 'Error al obtener los datos del usuario.',
				status: NOTIFICATION_STATUS.error,
			},
		})
		container.dispatchEvent(userDataFailed)
	}
}

const handleEditProduct = (product) => {
	const modalInnerContainer = document.querySelector('.modal-inner-container')
	const editProductForm = createEditProductForm(product)
	const closeModalBtn = editProductForm.querySelector('.close-modal-btn')

	closeModalBtn.addEventListener('click', () =>
		handleCloseModalClicked(modalInnerContainer),
	)
	editProductForm.addEventListener('submit', async (e) => {
		e.preventDefault()

		const formData = new FormData(editProductForm)

		const updatedContent = {
			name: formData.get('product-name'),
			price: formData.get('product-price'),
			category: formData.get('product-category'),
			description: formData.get('product-description'),
			image:
				formData.get('product-image') ||
				'https://placehold.co/600?text=Image+not+provided',
		}

		try {
			const productOperationStarted = new CustomEvent('productOperationStarted')
			modalInnerContainer.dispatchEvent(productOperationStarted)

			await updateProduct(product.id, updatedContent)

			handleProductEditionSucceeded(modalInnerContainer)
		} catch (error) {
			handleProductOperationFailed(modalInnerContainer, error)
		} finally {
			const productOperationEnded = new CustomEvent('productOperationEnded')
			modalInnerContainer.dispatchEvent(productOperationEnded)
		}
	})

	modalInnerContainer.appendChild(editProductForm)
}

const handleDeleteProduct = (product) => {
	const modalContainer = document.querySelector('.modal-inner-container')
	const deleteProductForm = createDeleteProductForm()
	const closeModalBtn = deleteProductForm.querySelector('.close-modal-btn')
	closeModalBtn.addEventListener('click', () => handleCloseModalClicked(modalContainer))

	deleteProductForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		try {
			const productOperationStarted = new CustomEvent('productOperationStarted')
			modalContainer.dispatchEvent(productOperationStarted)

			await deleteProduct(product.id)

			handleProductDeletionSucceeded()
		} catch (error) {
			handleProductOperationFailed(modalContainer, error)
		} finally {
			const productOperationEnded = new CustomEvent('productOperationEnded')
			modalContainer.dispatchEvent(productOperationEnded)
		}
	})

	modalContainer.appendChild(deleteProductForm)
}

const removePreviousForm = (container) => {
	const form = container.querySelector('.detail-product-form')
	form?.remove()
}

const handleActionBtnClicked = (container) => {
	const actionProductBtnClicked = new CustomEvent('actionProductBtnClicked')
	container.dispatchEvent(actionProductBtnClicked)
}

const handleCloseModalClicked = (container) => {
	const closeModalBtnClicked = new CustomEvent('closeModalBtnClicked')
	container.dispatchEvent(closeModalBtnClicked)
	removePreviousForm(container)
}

const handleProductEditionSucceeded = (container) => {
	const productEditionSucceeded = new CustomEvent('productEditionSucceeded', {
		detail: {
			message: 'Producto editado correctamente',
			status: NOTIFICATION_STATUS.success,
		},
	})
	container.dispatchEvent(productEditionSucceeded)
	removePreviousForm(container)
}

const handleProductDeletionSucceeded = () => {
	setSessionNotification({
		message: 'Producto eliminado correctamente.',
		status: NOTIFICATION_STATUS.success,
	})

	window.location = 'index.html'
}

const handleProductOperationFailed = (container, error) => {
	const productOperationFailed = new CustomEvent('productOperationFailed', {
		detail: {
			message: error.message || 'No ha sido posible realizar la operación',
			status: NOTIFICATION_STATUS.error,
		},
	})
	container.dispatchEvent(productOperationFailed)
}
