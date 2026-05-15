import { debounce } from '../../../utils/utils.js'

export const filtersController = (container) => {
	const query = new URLSearchParams(window.location.search)
	const productsPerPage = container.querySelector('#limit')
	const sort = container.querySelector('#sort')
	const search = container.querySelector('#search')
	query.set('_page', '1')

	productsPerPage.addEventListener('input', (e) => {
		updateQuery({ _limit: e.target.value })
	})

	sort.addEventListener('input', (e) => {
		const [sort, order] = e.target.value.split('_')
		updateQuery({ _sort: sort, _order: order })
	})

	search.addEventListener('input', (e) => {
		debounceSearch({ q: e.target.value })
	})

	const updateQuery = (filter) => {
		for (const key in filter) {
			query.set(key, filter[key])
			if (filter[key] === '') query.delete(key)
		}

		window.location.search = `?${query.toString()}`
		const filtersChanged = new CustomEvent('filtersChanged')
		container.dispatchEvent(filtersChanged)
	}

	const debounceSearch = debounce(updateQuery, 1000)
}
