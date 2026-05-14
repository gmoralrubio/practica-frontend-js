import { debounce } from '../../../utils/utils.js'

export const filtersController = (container) => {
	const query = new URLSearchParams()

	const productsPerPage = container.querySelector('#limit')
	const sort = container.querySelector('#sort')
	const search = container.querySelector('#search')

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

	// container.addEventListener('input', (e) => {

	// 	const key = `_${e.target.name}`
	// 	const value = e.target.value

	// 	key === 'q' ? debounceSearch(key, value) : updateQuery(key, value)
	// })

	const updateQuery = (filter) => {
		for (const key in filter) {
			query.set(key, filter[key])
			if (filter[key] === '') query.delete(key)
		}
		console.log(query.toString())

		// query.set(key, value)
		emitQuery(container, `&${query.toString()}`)
	}

	const debounceSearch = debounce(updateQuery, 1000)
}

const emitQuery = (container, query) => {
	const filtersChanged = new CustomEvent('filtersChanged', {
		detail: { query },
	})
	container.dispatchEvent(filtersChanged)
}
