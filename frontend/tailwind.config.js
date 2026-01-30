/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                surface: '#171717',
                primary: '#14b8a6', // Teal
                secondary: '#a3a3a3', // Gray
                accent: '#2dd4bf', // Lighter Teal
            }
        },
    },
    plugins: [],
}
