/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#ffffff',
                surface: '#f5f5f5',
                primary: '#000000',
                secondary: '#666666',
                accent: '#333333',
            }
        },
    },
    plugins: [],
}
