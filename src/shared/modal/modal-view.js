export const createModal = () => {
	const modal = document.createElement('dialog')
	modal.classList.add('modal')

	modal.innerHTML = `
	<div class="modal-box w-md modal-content">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<div class="modal-loader-container"></div>
		<div class="modal-notification-container"></div>
	</div>
	<form
		method="dialog"
		class="modal-backdrop"
	>
		<button>close</button>
	</form>
	`

	return modal
}
