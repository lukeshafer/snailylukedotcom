// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import theme from './src/code-theme.json'

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
	markdown: {
		shikiConfig: {
      // @ts-expect-error - this theme is valid
			theme: theme,
		},
	},
	integrations: [tailwind(), solidJs()],
	output: 'static',
});
