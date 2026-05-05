import { loaderController } from './loader/loader-controller.js'
import { productsListController } from './products-list/products-list-controller.js'

const productsContainer = document.querySelector('.products-container')
const loaderContainer = document.querySelector('.loader-container')

const { showLoader, hideLoader } = loaderController(loaderContainer)

productsContainer.addEventListener('productsLoadStarted', showLoader)
productsContainer.addEventListener('productsLoadEnded', hideLoader)

productsListController(productsContainer)
