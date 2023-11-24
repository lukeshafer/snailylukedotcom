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

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional(),
		draft: z.boolean().optional(),
	}),
});

export const collections = { snippets, blog };
