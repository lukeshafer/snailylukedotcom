import { fontFamily } from 'tailwindcss/defaultTheme';
import tailwindScrollbar from 'tailwind-scrollbar';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', ...fontFamily.sans],
			},
		},
	},
	plugins: [tailwindScrollbar, typography],
};
