/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                navDark: "#181824",
                darkSecondaryColor: "#39394E"
            },
        },

    },
    plugins: [],
}