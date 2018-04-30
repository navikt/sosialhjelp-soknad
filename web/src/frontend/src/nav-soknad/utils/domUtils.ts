export function focusOnFirstElement(el: HTMLElement) {
	if (el) {
		const focusElement = el.querySelector("input, select, textarea, button");
		if (focusElement) {
			(focusElement as HTMLElement).focus();
		}
	}
}

export function visMenu() {
	const body = document.getElementsByTagName("body")[0];
	body.classList.remove("without-menu");
}

export function skjulMenu() {
	const body = document.getElementsByTagName("body")[0];
	body.classList.add("without-menu");
}
