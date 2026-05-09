import { createLoader } from './loader-view.js'

export const loaderController = () => {
	const loader = createLoader()

	const showLoader = (loaderContainer) => {
		loaderContainer.innerHTML = loader
		loaderContainer.classList.add('is-loading')
	}
	const hideLoader = (loaderContainer) => {
		loaderContainer.innerHTML = ''
		loaderContainer.classList.remove('is-loading')
	}

	return { showLoader, hideLoader }
}
