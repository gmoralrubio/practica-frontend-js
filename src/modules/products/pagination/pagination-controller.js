import { createPaginationBtnGroup } from './pagination-view.js'

export const paginationController = (paginationContainer, totalProducts) => {
	const query = new URLSearchParams(window.location.search)

	const currentPage = query.get('_page') || 1
	const limit = query.get('_limit') || 10
	const totalPages = Math.ceil(totalProducts / limit)
	const paginationBtnGroup = createPaginationBtnGroup(currentPage, totalPages)

	if (!paginationBtnGroup) return ''

	const paginationBtns = paginationBtnGroup.querySelectorAll('button')
	paginationBtns.forEach((button) => {
		button.addEventListener('click', (e) => {
			const newPage = e.target.textContent
			const paginationChanged = new CustomEvent('paginationChanged', {
				detail: { newPage },
			})
			paginationContainer.dispatchEvent(paginationChanged)
		})
	})
	paginationContainer.innerHTML = ''
	paginationContainer.appendChild(paginationBtnGroup)
}
