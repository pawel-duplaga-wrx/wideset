import type { ComponentType } from 'react';

import {
  exampleCode,
  exampleDescription,
} from '../../../../packages/design-system/src/stories/example';
import pages from '../generated/pages.json';

/**
 * The Examples section of a component page. Every example is a file in the library,
 * `packages/design-system/src/components/<folder>/examples/<id>/<name>.tsx`, that Storybook
 * shows as a story too. It is imported twice: once as a component to render, once as raw text
 * to print, so the code on the page is the code that ran. Its leading JSDoc is the
 * description; the folder's `index.ts` lists the examples in reading order. `default.tsx` is
 * the playground's stage (src/lib/playground.tsx), not an example.
 *
 * Server only (the page, the Markdown version); the Example island gets the text as props
 * and loads the one component it shows through src/lib/exampleLoader.ts.
 *
 * The library's src/__tests__/examples.test.tsx enforces the same rules in CI; the checks
 * here only make a broken folder fail the docs build with a readable message.
 */
const ROOT = '../../../../packages/design-system/src/components/';
const modules = import.meta.glob<{ default: ComponentType }>(
  '../../../../packages/design-system/src/components/*/examples/*/*.tsx',
  { eager: true },
);
const sources = import.meta.glob<string>(
  '../../../../packages/design-system/src/components/*/examples/*/*.tsx',
  { query: '?raw', import: 'default', eager: true },
);
const manifests = import.meta.glob<{ default: string[] }>(
  '../../../../packages/design-system/src/components/*/examples/*/index.ts',
  { eager: true },
);

const PAGES = pages as Record<string, { examples: string; props?: string }>;

/** `with-icon` → `With icon` */
const titleOf = (name: string) => {
  const words = name.split('-');
  return (
    words[0].charAt(0).toUpperCase() +
    words[0].slice(1) +
    (words.length > 1 ? ` ${words.slice(1).join(' ')}` : '')
  );
};

/** Description and printed code, read exactly as Storybook reads them (one rule, one place). */
const captionOf = exampleDescription;
const codeOf = exampleCode;

export type Example = {
  name: string;
  title: string;
  caption?: string;
  code: string;
  Component: ComponentType;
  /** The file, as src/lib/exampleLoader.ts globs it. */
  file: string;
};

/** The folder of a page's examples, as the globs above key it: `…/components/button/examples/icon-button/`. */
const examplesFolder = (component: string) => {
  const page = PAGES[component];
  if (!page) throw new Error(`examples: no page "${component}" in the catalogue`);
  return `${ROOT}${page.examples}/`;
};

const cache = new Map<string, Example[]>();

export const examplesFor = (component: string): Example[] => {
  if (cache.has(component)) return cache.get(component)!;
  const folder = examplesFolder(component);
  const order = manifests[`${folder}index.ts`]?.default;
  if (!order)
    throw new Error(`examples: ${folder}index.ts is missing; it lists the examples in order`);
  const files = Object.keys(sources)
    .filter((path) => path.startsWith(folder))
    .map((path) => path.slice(folder.length).replace(/\.tsx$/, ''))
    .filter((name) => name !== 'default');
  const unlisted = files.filter((name) => !order.includes(name));
  if (unlisted.length)
    throw new Error(`examples: ${folder}index.ts does not list ${unlisted.join(', ')}`);
  const examples = order.map((name) => {
    const file = `${folder}${name}.tsx`;
    const source = sources[file];
    if (!source) throw new Error(`examples: ${folder}index.ts lists "${name}", which has no file`);
    const caption = captionOf(source);
    if (!caption)
      throw new Error(
        `examples: ${file} has no description; start it with a JSDoc that says what the title and preview do not`,
      );
    return {
      name,
      title: titleOf(name),
      caption,
      code: codeOf(source),
      Component: modules[file].default,
      file,
    };
  });
  cache.set(component, examples);
  return examples;
};
