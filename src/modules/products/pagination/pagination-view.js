export const createPaginationBtnGroup = (currentPage, totalPages) => {
	if (totalPages <= 1) return ''

	const paginationBtnGroup = document.createElement('div')
	paginationBtnGroup.classList.add('join')

	for (let i = 1; i <= totalPages; i++) {
		const pageBtn = `<button class="join-item btn ${i === Number(currentPage) ? 'btn-active' : ''}" >${i}</button>`
		paginationBtnGroup.innerHTML += pageBtn
	}

	return paginationBtnGroup
}
