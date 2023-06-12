/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
        extend: {
            maxWidth: {
                'dashboard-content': 'calc(100% - 15rem)',
            },
            maxHeight: {
                'sidebar-content': 'calc(100vh - 144px)',
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar')({ nocompatible: true }),
    ],
}

