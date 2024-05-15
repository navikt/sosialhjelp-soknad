/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                digisosGronnLys: "#9bd0b0",
                digisosGronnMork: "#38a161",
                digisosGronnBakgrunn: "#D4E6D8",
            },
            screens: {
                xs: "480px", // for å matche DS "mobile" breakpoint
            },
        },
    },
    presets: [require("@navikt/ds-tailwind")],
};
