import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

/**
 * A component's usage guidance, written once in packages/design-system/specs (gen-guidance.mjs).
 * The page shows when to use it and when not; the Markdown for models adds which props for which
 * job, do and don't, and what breaks.
 */
const idOf = (path: string) => path.split('/').pop()!.replace(/\.md$/, '');

const pages = import.meta.glob<{ Content: AstroComponentFactory }>('../generated/guidance/*.md', {
  eager: true,
});
const sources = import.meta.glob<string>('../generated/guidance-md/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const contentById = new Map(
  Object.entries(pages).map(([path, page]) => [idOf(path), page.Content]),
);
const markdownById = new Map(Object.entries(sources).map(([path, text]) => [idOf(path), text]));

/** The rendered guidance for the component's page, if it has a spec. */
export const guidanceContent = (id: string) => contentById.get(id);
/** The same guidance as Markdown, for `/components/<id>.md` and `llms-full.txt`. */
export const guidanceMarkdown = (id: string) => markdownById.get(id)?.trim() ?? '';
