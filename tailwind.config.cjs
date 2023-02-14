/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				lg: '0rem'
			},
		},
		extend: {
			fontFamily: {
				"lora": ["Lora", "serif"], //4567 italic
				"great": ["Great Vibes", "cursive"]
			},
			colors: {
				dark: "#262626",
				light: "#f5f5f5",
				primary: "#5D7EE3"
			}
		},
		screens: {
			'sm': "640px",
			'md': "768px",
			'lg': "1024px",
			'xl': "1280px",
			'2xl': "1400px"
		}
	},
	plugins: [
		require('prettier-plugin-tailwindcss'),
	],
}
