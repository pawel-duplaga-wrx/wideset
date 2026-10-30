import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

/**
 * Written pages. One MDX file per page under src/content/docs; the file name is the URL
 * segment (`introduction.mdx` → /docs/introduction).
 */
const docs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /**
     * The collapsible group the page sits in. Without one the page is a top row of the column
     * (Introduction, Installation, What's new), placed by `order`; inside a group pages sort
     * alphabetically.
     */
    section: z.enum(['Guide', 'Foundations', 'Community']).optional(),
    /** Position of a top row; ignored inside a group. */
    order: z.number().default(100),
  }),
});

export const collections = { docs };
