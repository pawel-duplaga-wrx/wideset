import { getCollection } from 'astro:content';

import { entries } from './catalog';
import { componentMarkdown } from './markdown';

/**
 * What `/llms.txt` and `/llms-full.txt` are made of (https://llmstxt.org): the docs pages in
 * the order the left column shows them, then the component catalogue.
 */
export const SITE_SUMMARY =
  'Wideset is a React component library (`@wideset/react`): Radix primitives, Tailwind CSS v4 and design tokens with the `ws` prefix, documented with live examples and props. Components install as an npm package or are copied into a project from a shadcn registry.';

const SECTIONS = ['Guide', 'Foundations', 'Community'] as const;

type DocsEntry = Awaited<ReturnType<typeof getCollection<'docs'>>>[number];

/** Top rows by `order`, then each group alphabetically, as `docsNav` lays them out. */
export const docsPages = async () => {
  const pages = await getCollection('docs');
  const top = pages
    .filter((page) => !page.data.section)
    .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
  const groups = SECTIONS.map((label) => ({
    label,
    pages: pages
      .filter((page) => page.data.section === label)
      .sort((a, b) => a.data.title.localeCompare(b.data.title)),
  })).filter((group) => group.pages.length > 0);
  return { top, groups, all: [...top, ...groups.flatMap((group) => group.pages)] };
};

export const docUrl = (page: DocsEntry, site: URL) => new URL(`/docs/${page.id}`, site).href;
export const componentUrl = (id: string, site: URL) => new URL(`/components/${id}`, site).href;

/**
 * An MDX body as plain Markdown. Code fences pass through untouched; in the prose between
 * them imports and `{/* … *\/}` comments go, wrapper elements keep their children, and live
 * widgets (token tables, playgrounds) become a pointer to the HTML page.
 */
export const mdxToMarkdown = (body: string, pageUrl: string) => {
  const pointer = `_Interactive content; see ${pageUrl}._`;
  const prose = (text: string) =>
    text
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      // Module lines only: prose can start a line with "import icons from `…`".
      .replace(
        /^(?:import\s.*\sfrom\s+['"].*|import\s+['"].*|export\s+(?:const|function)\s.*)$/gm,
        '',
      )
      // A self-closing component, possibly over several lines: `<Palette />`, `<TokenTable of="…" />`.
      .replace(/^<[A-Z][^>]*\/>[ \t]*$/gm, pointer)
      // Wrappers (`<Note title="…">`, `<div class="…">`) keep what is inside; a
      // `title` becomes a bold lead line.
      .replace(/^[ \t]*<(?:[A-Z][\w.]*|div|span|section)(?:\s[^>]*)?>[ \t]*$/gm, (tag) => {
        const title = tag.match(/\stitle="([^"]*)"/)?.[1];
        return title ? `**${title}**\n` : '';
      })
      .replace(/^[ \t]*<\/(?:[A-Z][\w.]*|div|span|section)>[ \t]*$/gm, '')
      // Their children are indented, which Markdown would read as code; list items keep theirs.
      .replace(/^[ \t]+(?![-*+]\s|\d+\.\s)(?=\S)/gm, '')
      // Site-relative links work only on the site.
      .replace(/\]\(\//g, `](${new URL(pageUrl).origin}/`);
  return body
    .replace(/\r\n?/g, '\n')
    .split(/(^```[\s\S]*?^```[ \t]*$)/m)
    .map((part, index) => (index % 2 === 1 ? part : prose(part)))
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

/** One docs page as Markdown: title, description and URL first. */
export const docMarkdown = (page: DocsEntry, site: URL) => {
  const url = docUrl(page, site);
  return [
    `# ${page.data.title}`,
    page.data.description,
    `Source: ${url}`,
    mdxToMarkdown(page.body ?? '', url),
  ].join('\n\n');
};

export const componentPages = () =>
  entries.map((entry) => ({ entry, markdown: () => componentMarkdown(entry) }));
