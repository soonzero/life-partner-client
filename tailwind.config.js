/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		screens: {
			xs: '320px',
			sm: '544px',
			md: '768px',
			lg: '1024px',
			xl: '1440px',
			'2xl': '1920px',
			'4xl': '2560px',
		},
		extend: {
			colors: {
				main: '#69C4E1',
				dark: '#1F2937',
			},
			borderWidth: {
				1: '1px',
			},
			boxShadow: {
				main: '0 6px 16px',
			},
			boxShadowColor: {
				main: 'rgba(0, 0, 0, 0.12)',
			},
			animation: {
				marquee: 'marquee 5s linear infinite',
			},
			keyframes: {
				marquee: {
					'0%': {
						transform: 'translateX(100%)',
					},
					'100%': {
						transform: 'translateX(-100%)',
					},
				},
			},
		},
	},
	plugins: [],
};
