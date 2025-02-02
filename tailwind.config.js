/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "custom-yellow": "rgba(255, 254, 241, 1)",
                "custom-blue": "rgba(221, 238, 248, 1)",
                "button-blue":"rgba(0, 82, 204, 1)",
                "highlight-blue":"rgba(197, 233, 255, 1)"
            }
        },

    },
    plugins: [],
};
