import navikt from "@navikt/ds-tailwind";
/** @type {import('tailwindcss').Config} */

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    presets: [navikt],
    theme: {
        extend: {
            screens: {
                xs: "480px", // for å matche DS "mobile" breakpoint
            },
        },
    },
};
