import {scroller, animateScroll} from "react-scroll";

const defaultOptions = {
    duration: 500,
    easing: "easeOutQuad",
};

export function scrollToElement(id: string) {
    scroller.scrollTo(id, {
        ...defaultOptions,
        offset: -30,
    });
}

export function scrollToTop() {
    animateScroll.scrollToTop(defaultOptions);
}
