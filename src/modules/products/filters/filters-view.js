export const createFilters = (query) => {
	const limit = Number(query.get('_limit'))
	const sort = query.get('_sort')
	const order = query.get('_order')
	const sortOrder = `${sort}_${order}`
	const search = query.get('q')

	const limitOptions = [5, 10, 15]
	const sortOptions = {
		name_asc: 'Nombre ascendente',
		name_desc: 'Nombre descendente',
		price_asc: 'Precio ascendente',
		price_desc: 'Precio descendente',
	}

	let limitSelect = limitOptions
		.map((option) => {
			return `<option value="${option}" ${limit === option ? 'selected' : ''}>${option}</option>`
		})
		.join('')

	let sortSelect = ''
	for (const option in sortOptions) {
		const selectOpt = `<option value="${option}" ${sortOrder === option ? 'selected' : ''} >${sortOptions[option]}</option>`
		sortSelect += selectOpt
	}

	const filtersWrapper = document.createElement('div')
	filtersWrapper.innerHTML = `
	<p class="text-sm font-medium">Filtros</p>
        <div class="divider my-1"></div>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Productos por página</legend>
          <select
            class="select"
            name="limit"
            id="limit"
          >
            <option
              disabled
            >Selecciona</option>
			${limitSelect}
          </select>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Orden</legend>
          <select
            class="select"
            name="sort"
            id="sort"
          >
            <option
              disabled
            >Selecciona</option>

            ${sortSelect}
          </select>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Buscar producto</legend>
          <label class="input">
            <svg
              class="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                ></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Buscar"
			  value="${search ?? ''}"
            />
          </label>
        </fieldset>`

	return filtersWrapper
}
