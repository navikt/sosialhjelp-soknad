/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                olddigisosGronnLys: "#9bd0b0",
                olddigisosGronnMork: "#38a161",
                olddigisosGronnBakgrunn: "#D4E6D8",
                digisosGronnLys: "#A8D5C2",
                digisosGronnMork: "#2E8B57",
                digisosGronnBakgrunnTop: "#E0F2E9",
                digisosGronnBakgrunnBottom: "#C8E0D5",
            },
        },
    },
    presets: [require("@navikt/ds-tailwind")],
};
