import { createLoader } from './loader-view.js'

export const loaderController = (loaderContainer) => {
	const loader = createLoader()

	const showLoader = () => {
		loaderContainer.innerHTML = loader
		loaderContainer.classList.add('is-loading')
	}
	const hideLoader = () => {
		loaderContainer.innerHTML = ''
		loaderContainer.classList.remove('is-loading')
	}

	return { showLoader, hideLoader }
}
