export function focusOnFirstElement(el: HTMLElement) {
	if (el) {
		const focusElement = el.querySelector("input, select, textarea, button");
		if (focusElement) {
			(focusElement as HTMLElement).focus();
		}
	}
}

export function skjulToppMeny(): void {
	const topnav = document.getElementsByClassName("topnavsection-wrapper");
	if (topnav && topnav[0]) {
		topnav[0].classList.add("hidden-topnavsection");
	}
}

export function visToppMeny(): void {
	const topnav = document.getElementsByClassName("topnavsection-wrapper");
	if (topnav && topnav[0]) {
		topnav[0].classList.remove("hidden-topnavsection");
	}
}
