/** @type {import('tailwindcss').Config} */

import navDs from "@navikt/ds-tailwind";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "480px", // for å matche DS "mobile" breakpoint
            },
        },
    },
    presets: [navDs],
};
