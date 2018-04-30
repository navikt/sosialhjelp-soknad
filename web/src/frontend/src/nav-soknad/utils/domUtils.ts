export function focusOnFirstElement(el: HTMLElement) {
	if (el) {
		const focusElement = el.querySelector("input, select, textarea, button");
		if (focusElement) {
			(focusElement as HTMLElement).focus();
		}
	}
}
