import type { APIRoute } from 'astro';

import { entries, entryById } from '../../lib/catalog';
import { componentMarkdown } from '../../lib/markdown';

/** Every component page as plain Markdown at `/components/<id>.md`, for models and "View as markdown". */
export function getStaticPaths() {
  return entries.map((entry) => ({ params: { id: entry.id } }));
}

export const GET: APIRoute = ({ params }) => {
  const entry = entryById(params.id!)!;
  return new Response(componentMarkdown(entry), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
