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
            },
            spacing: {
                'safe-area-top': 'env(safe-area-inset-top)',
                'safe-area-bottom': 'env(safe-area-inset-bottom)',
                'safe-area-left': 'env(safe-area-inset-left)',
                'safe-area-right': 'env(safe-area-inset-right)',
            }
        },
    },
    plugins: [],
}
