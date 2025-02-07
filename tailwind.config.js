/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            'md': '640px',
            // => @media (min-width: 746px) { ... }
      
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }
          },
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
