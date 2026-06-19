/** @type {import('tailwindcss').Config} */

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "480px", // for å matche DS "mobile" breakpoint
            },
        },
    },
};
