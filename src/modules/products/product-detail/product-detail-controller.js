import { NOTIFICATION_STATUS } from '../../../shared/notification/notification-config.js'
import { setSessionNotification } from '../../../shared/session-notification/session-notification-controller.js'
import { getProductById } from './product-detail-model.js'
import {
	createDeleteProductBtn,
	createEditProductBtn,
	createProductDetail,
} from './product-detail-view.js'

export const productDetailController = async (container, getLoggedUserInfo) => {
	const searchParams = new URLSearchParams(window.location.search)
	const productId = searchParams.get('id')

	if (!productId) window.location = 'index.html'

	try {
		const productLoadStarted = new CustomEvent('productLoadStarted')
		container.dispatchEvent(productLoadStarted)

		const product = await getProductById(productId)
		const productDetail = createProductDetail(product)
		container.appendChild(productDetail)

		handleUserActions(container, product, getLoggedUserInfo)
	} catch (error) {
		setSessionNotification({
			message: error.message,
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
			handleEditProduct(container, product)
			handleRemoveProduct(container, product)
		}
	} catch (error) {
		console.log(error)

		const userDataFailed = new CustomEvent('userDataFailed', {
			detail: {
				message: 'Error al obtener los datos del usuario.',
				status: NOTIFICATION_STATUS.error,
			},
		})
		container.dispatchEvent(userDataFailed)
	}
}

const handleEditProduct = (container, product) => {
	const editProductBtn = createEditProductBtn()
	editProductBtn.addEventListener('click', async () => {
		const editPoductBtnClicked = new CustomEvent('editPoductBtnClicked', {
			detail: { product },
		})
		container.dispatchEvent(editPoductBtnClicked)
	})
	const actionContainer = container.querySelector('.product-action-container')
	actionContainer.appendChild(editProductBtn)
}

const handleRemoveProduct = (container, product) => {
	const removeProductBtn = createDeleteProductBtn()
	removeProductBtn.addEventListener('click', async () => {
		const removeProductBtnClicked = new CustomEvent('removeProductBtnClicked', {
			detail: { product },
		})
		container.dispatchEvent(removeProductBtnClicked)
	})
	const actionContainer = container.querySelector('.product-action-container')
	actionContainer.appendChild(removeProductBtn)
}
