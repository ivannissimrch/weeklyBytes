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
                "custom-yellow-root": "rgba(255, 254, 241, 1)",
                "custom-yellow": "rgba(248, 245, 221, .9)",
                "button-yellow":"rgba(255, 204, 0, 1)",
                "highlight-yellow":"rgb(255, 230, 131)"
            }
        },

    },
    plugins: [],
};
