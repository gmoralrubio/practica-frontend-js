export const formatNumberToEuro = (number) => {
	return new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR',
	}).format(number)
}
// https://www.freecodecamp.org/news/javascript-debounce-example/
export const debounce = (func, timeout = 300) => {
	let timer
	return (...args) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this, args)
		}, timeout)
	}
}
