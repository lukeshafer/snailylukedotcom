import { z, defineCollection } from 'astro:content';

const snippets = defineCollection({
	schema: z.object({
		title: z.string().min(1).max(100),
		key: z.string(),
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
