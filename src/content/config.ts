import { z, defineCollection } from 'astro:content';
import langs from './langs';

const snippets = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string().min(1).max(100),
		lang: z.enum(langs),
		content: z.string(),
	}),
});

export const collections = { snippets };
