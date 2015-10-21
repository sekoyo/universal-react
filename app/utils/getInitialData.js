import isClient from './isClient'

function getInitialData() {
	if (!isClient) {
		return;
	}

	let initialDataEl = document.getElementById('initialData');

	if (initialDataEl) {
		return JSON.parse(initialDataEl.textContent);
	}
}

export default getInitialData;