import { createModal } from './modal-view.js'

export const modalController = (modalContainer) => {
	const modal = createModal()
	modalContainer.appendChild(modal)
	// Los métodos showModal() y close() los proporciona DaisyUI (https://daisyui.com/components/modal/#method-1-html-dialog-element-recommended)
	const openModal = () => modal.showModal()
	const closeModal = () => modal.close()

	return { openModal, closeModal }
}
