import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { cleanup, render } from '@testing-library/react';
import type { ComponentType } from 'react';
import ts from 'typescript';
import { afterEach, describe, expect, it } from 'vitest';

/*
  The examples are what a consumer sees of a component: each one is a section of its docs page
  (apps/docs) and a story in Storybook, from one file. Layout, per page:

    src/components/<folder>/examples/<page>/default.tsx   the playground's stage, root takes {...props}
    src/components/<folder>/examples/<page>/<name>.tsx    one example, leading JSDoc = description
    src/components/<folder>/examples/<page>/index.ts      the names in reading order

  A page is a stories file whose component the package exports (`Button.stories.tsx` → button,
  `IconButton.stories.tsx` → icon-button). Internal components have stories but no page.
*/
const ROOT = resolve(__dirname, '..');
const COMPONENTS = join(ROOT, 'components');

const publicNames = (() => {
  const source = readFileSync(join(ROOT, 'index.ts'), 'utf8');
  const sf = ts.createSourceFile('index.ts', source, ts.ScriptTarget.Latest, true);
  const names = new Set<string>();
  sf.forEachChild((node) => {
    if (!ts.isExportDeclaration(node) || node.isTypeOnly || !node.exportClause) return;
    if (!ts.isNamedExports(node.exportClause)) return;
    for (const el of node.exportClause.elements)
      if (!el.isTypeOnly) names.add(el.name.text.toLowerCase());
  });
  return names;
})();

/** `IconButton` → `icon-button` (the docs' page id, apps/docs/scripts/gen-catalog.mjs). */
const slug = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const folders = readdirSync(COMPONENTS).filter((dir) =>
  statSync(join(COMPONENTS, dir)).isDirectory(),
);
const pages = folders.flatMap((folder) =>
  readdirSync(join(COMPONENTS, folder))
    .filter((file) => file.endsWith('.stories.tsx'))
    .map((file) => file.replace('.stories.tsx', ''))
    .filter((name) => publicNames.has(name.toLowerCase()))
    .map((name) => ({ folder, name, id: slug(name) })),
);

const modules = import.meta.glob<{ default: ComponentType }>('../components/*/examples/*/*.tsx', {
  eager: true,
});
const sources = import.meta.glob<string>('../components/*/examples/*/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
});
const manifests = import.meta.glob<{ default: string[] }>('../components/*/examples/*/index.ts', {
  eager: true,
});

const LEADING_JSDOC = /^\s*\/\*\*([\s\S]*?)\*\//;
const examplePath = (folder: string, id: string, name: string) =>
  `../components/${folder}/examples/${id}/${name}.tsx`;

afterEach(cleanup);

describe('examples', () => {
  it('finds the pages', () => {
    expect(pages.length).toBeGreaterThan(40);
  });

  it('has no examples folder for a component without a page', () => {
    const allowed = new Set(pages.map(({ folder, id }) => `${folder}/${id}`));
    const folderKeys = new Set(
      Object.keys(manifests).map((path) =>
        path.split('/').slice(2, 5).join('/').replace('/examples', ''),
      ),
    );
    expect([...folderKeys].filter((key) => !allowed.has(key))).toEqual([]);
  });

  describe.each(pages)('$id', ({ folder, name, id }) => {
    const manifest = manifests[`../components/${folder}/examples/${id}/index.ts`]?.default;
    const prefix = `../components/${folder}/examples/${id}/`;
    const files = Object.keys(sources)
      .filter((path) => path.startsWith(prefix))
      .map((path) => path.slice(prefix.length).replace(/\.tsx$/, ''));

    it('has a playground stage (default.tsx)', () => {
      expect(files).toContain('default');
    });

    it('lists every example in index.ts, and only files that exist', () => {
      expect(manifest, `${prefix}index.ts`).toBeDefined();
      expect([...(manifest ?? [])].sort()).toEqual(
        files.filter((file) => file !== 'default').sort(),
      );
    });

    it('starts every example with a JSDoc description', () => {
      const missing = (manifest ?? []).filter(
        (example) => !LEADING_JSDOC.test(sources[examplePath(folder, id, example)] ?? ''),
      );
      expect(missing).toEqual([]);
    });

    it('shows every example as a story', () => {
      const stories = readFileSync(join(COMPONENTS, folder, `${name}.stories.tsx`), 'utf8');
      const missing = (manifest ?? []).filter(
        (example) => !stories.includes(`'./examples/${id}/${example}?raw'`),
      );
      expect(missing).toEqual([]);
    });

    it('renders the stage and every example', () => {
      for (const file of files) {
        const Example = modules[examplePath(folder, id, file)].default;
        expect(() => render(<Example />), `${prefix}${file}.tsx`).not.toThrow();
        cleanup();
      }
    });
  });
});
