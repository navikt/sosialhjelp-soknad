export function focusOnFirstElement(el: HTMLElement) {
	if (el) {
		const focusElement = el.querySelector("input, select, textarea, button");
		if (focusElement) {
			(focusElement as HTMLElement).focus();
		}
	}
}

export function skjulToppMeny(): void {
	let topnav = document.getElementsByClassName("topnavsection-wrapper")[0];
	topnav.classList.add("hidden-topnavsection");
}

export function visToppMeny(): void {
	let topnav = document.getElementsByClassName("topnavsection-wrapper")[0];
	topnav.classList.remove("hidden-topnavsection");
}