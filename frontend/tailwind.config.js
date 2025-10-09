

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'roboto': ['Roboto', 'sans-serif'], // 'roboto' is the Tailwind class prefix
                'sans': ['Inter', 'sans-serif'], // Default body font (overrides Tailwind's default)
                'poppins': ['Poppins', 'sans-serif'], // For headings
            },
        },
    },
    plugins: [],
}