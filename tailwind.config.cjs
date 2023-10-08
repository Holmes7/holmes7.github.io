/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				monaco: ['Monaco', 'monospace'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
