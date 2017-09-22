import { scroller } from "react-scroll";

export function scrollToElement(id: string) {
	scroller.scrollTo(id, {
		duration: 500,
		smooth: "easeOutQuad",
		offset: -30
	});
}
