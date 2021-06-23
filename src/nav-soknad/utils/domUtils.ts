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

export function erMobilVisning(): boolean {
    const width = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
    return width < 480;
}
