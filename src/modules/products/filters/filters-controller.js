import { debounce } from '../../../utils/utils.js'
import { createFilters } from './filters-view.js'

export const filtersController = (container) => {
	const query = new URLSearchParams(window.location.search)

	const filters = createFilters(query)

	const productsPerPage = filters.querySelector('#limit')
	const sort = filters.querySelector('#sort')
	const tags = filters.querySelector('#tags')
	const search = filters.querySelector('#search')
	query.set('_page', '1')

	productsPerPage.addEventListener('input', (e) => {
		updateQuery({ _limit: e.target.value })
	})

	sort.addEventListener('input', (e) => {
		const [sort, order] = e.target.value.split('_')
		updateQuery({ _sort: sort, _order: order })
	})

	tags.addEventListener('input', () => {
		const checkedTags = Array.from(
			filters.querySelectorAll('input[name="tags"]:checked'),
		).map((tag) => tag.value)
		updateQuery({ tags: checkedTags })
	})

	search.addEventListener('input', (e) => {
		debounceSearch({ q: e.target.value })
	})

	const updateQuery = (filter) => {
		for (const key in filter) {
			if (Array.isArray(filter[key])) {
				// Tags
				query.delete(key)
				for (const value of filter[key]) {
					query.append(key, value)
				}
			} else {
				// Resto filtros
				query.set(key, filter[key])
				if (filter[key] === '') query.delete(key)
			}
		}

		window.location.search = `?${query.toString()}`
		const filtersChanged = new CustomEvent('filtersChanged')
		container.dispatchEvent(filtersChanged)
	}

	const debounceSearch = debounce(updateQuery, 1000)

	container.appendChild(filters)
}
