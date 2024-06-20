import {animateScroll} from "react-scroll";

const defaultOptions = {
    duration: 500,
    easing: "easeOutQuad",
};

export function scrollToTop() {
    animateScroll.scrollToTop(defaultOptions);
}
