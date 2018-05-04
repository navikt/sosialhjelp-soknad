export function focusOnFirstElement(el: HTMLElement) {
	if (el) {
		const focusElement = el.querySelector("input, select, textarea, button");
		if (focusElement) {
			(focusElement as HTMLElement).focus();
		}
	}
}

export function skjulToppMeny(): void {
	const topnav = document.getElementsByClassName("topnavsection-wrapper")[0];
	topnav.classList.remove("show-topnavsection");

}

export function visToppMeny(): void {
	const topnav = document.getElementsByClassName("topnavsection-wrapper")[0];
	topnav.classList.add("show-topnavsection");
}
