import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import { componentIndex, specForConsumer } from '../scripts/build-skills.mjs';

/**
 * The specs are written by hand, and everything an agent is told about usage comes from them, so
 * they must not drift from the library. These checks read packages/design-system/specs.
 */
const PACKAGE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LIBRARY = resolve(PACKAGE, '../design-system');
const SPECS = join(LIBRARY, 'specs');
const read = (path: string) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const allSpecs = walk(SPECS).filter((file) => file.endsWith('.md'));
const componentSpecs = walk(join(SPECS, 'components')).filter(
  (file) => file.endsWith('.md') && !file.endsWith('README.md'),
);
const label = (file: string) => relative(SPECS, file).replace(/\\/g, '/');
const field = (text: string, name: string) =>
  text.match(new RegExp(`^${name}:\\s*(.+?)\\s*$`, 'm'))?.[1];
/** A YAML flow list, on one line or several: `parts: [Button, ButtonIcon]`. */
const listField = (text: string, name: string) =>
  (text.match(new RegExp(`^${name}:\\s*\\[([^\\]]*)\\]`, 'm'))?.[1] ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const publicExports = (() => {
  const names = new Set<string>();
  const file = ts.createSourceFile(
    'index.ts',
    read(join(LIBRARY, 'src/index.ts')),
    ts.ScriptTarget.Latest,
    true,
  );
  file.forEachChild((node) => {
    if (!ts.isExportDeclaration(node) || !node.exportClause) return;
    if (!ts.isNamedExports(node.exportClause)) return;
    for (const element of node.exportClause.elements)
      if (!element.isTypeOnly && !node.isTypeOnly) names.add(element.name.text);
  });
  return names;
})();
const specNames = new Set(componentSpecs.map((file) => field(read(file), 'name')));

/**
 * A fence as checkable units. A `// Don't` segment shows a mistake and a `…` leaves code out, so
 * neither has to compile; ` ```tsx fragment` marks a sketch that is not one module (a hook call
 * and where its result goes). Everything else must type-check.
 */
type Segment = { code: string; dont: boolean };
const segmentsOf = (fence: string): Segment[] => {
  const parts = fence.split(/^(?=\/\/ (?:Do|Don't|Wrong|Right|Bad|Good)\b)/m);
  return parts
    .map((code) => ({ code, dont: /^\/\/ (?:Don't|Wrong|Bad)\b/.test(code.trimStart()) }))
    .filter(({ code }) => code.replace(/^\s*\/\/.*$/gm, '').trim());
};
const fences = (text: string) =>
  [...text.matchAll(/^```tsx?[^\n]*\n([\s\S]*?)^```/gm)].map((match) => match[1]);

describe('specs cover the library', () => {
  it.each(componentSpecs.map((file) => [label(file), file]))(
    '%s names real parts and related components',
    (_, file) => {
      const text = read(file);
      const parts = listField(text, 'parts');
      expect(parts.length, 'parts').toBeGreaterThan(0);
      expect(parts.filter((name) => !publicExports.has(name))).toEqual([]);
      const related = listField(text, 'related');
      expect(related.filter((name) => !publicExports.has(name) && !specNames.has(name))).toEqual(
        [],
      );
    },
  );

  it.each(componentSpecs.map((file) => [label(file), file]))(
    '%s says when not to use it, and each line names what to use',
    (_, file) => {
      const text = read(file);
      if (field(text, 'status') === 'deprecated') return;
      const section = text.match(/^## When not to use\n([\s\S]*?)(?=^## )/m)?.[1] ?? '';
      const bullets = section.split(/\n(?=- )/).filter((line) => line.startsWith('- '));
      expect(bullets.length).toBeGreaterThan(0);
      expect(bullets.filter((line) => !/→|`[A-Z]|\b[A-Z][a-z]+[A-Z]|\buse\b/i.test(line))).toEqual(
        [],
      );
    },
  );
});

describe('specs match the library', () => {
  const NOT_WIDESET = new Set(['App', 'Link', 'Image', 'Fragment', 'React', 'Suspense']);

  it.each(allSpecs.map((file) => [label(file), file]))(
    '%s renders only real components and parts',
    (_, file) => {
      const unknown = new Set<string>();
      for (const fence of fences(read(file)).flatMap((text) =>
        segmentsOf(text)
          .filter((segment) => !segment.dont)
          .map((segment) => segment.code),
      )) {
        const local = new Set(
          [
            ...fence.matchAll(
              /\b(?:function|const|class)\s+([A-Z]\w*)|import\s+([A-Z]\w*)|\{\s*([A-Z]\w*)\s*\}\s*from\s*'(?!@wideset)/g,
            ),
          ].map((match) => match[1] ?? match[2] ?? match[3]),
        );
        for (const [, root, member] of fence.matchAll(
          /(?<![\w)\]])<([A-Z]\w*)(?:\.([A-Z]\w*))?/g,
        )) {
          if (local.has(root) || NOT_WIDESET.has(root) || /^Ri[A-Z]/.test(root)) continue;
          if (!publicExports.has(root)) unknown.add(root);
          else if (member && !publicExports.has(`${root}${member}`))
            unknown.add(`${root}.${member}`);
        }
      }
      expect([...unknown]).toEqual([]);
    },
  );

  it('type-checks every code sample that does not show a mistake', () => {
    const dir = join(LIBRARY, 'src/__spec_fences__');
    const origin = new Map<string, string>();
    const sources = new Map<string, string>();
    for (const file of allSpecs)
      fences(read(file).replace(/^```tsx fragment\n[\s\S]*?^```/gm, '')).forEach(
        (fence, fenceIndex) =>
          segmentsOf(fence).forEach((segment, index) => {
            if (segment.dont || segment.code.includes('…')) return;
            const path = join(
              dir,
              `${label(file).replace(/\W+/g, '_')}_${fenceIndex}_${index}.tsx`,
            );
            origin.set(path, label(file));
            sources.set(path, segment.code);
          }),
      );
    expect(origin.size).toBeGreaterThan(100);

    /** Whether TypeScript can parse this at all. */
    const parses = (code: string) =>
      !ts.transpileModule(code, {
        reportDiagnostics: true,
        fileName: 'sample.tsx',
        compilerOptions: { jsx: ts.JsxEmit.Preserve },
      }).diagnostics?.length;

    /**
     * Makes a complete module from a sample, which is usually a fragment: bare JSX, or statements
     * followed by JSX. Top-level `//` lines are dropped (in JSX they would be text), the sample's own
     * imports win, and every Wideset export and common React hook is in scope.
     */
    const wrap = (raw: string) => {
      const code = raw.replace(/^\/\/.*$/gm, '').trim();
      const own = code.match(/^import [\s\S]*?from '[^']+';?$/gm) ?? [];
      const body = own.reduce((text, line) => text.replace(line, ''), code).trim();
      const taken = new Set(
        own.flatMap((line) =>
          (line.match(/\{([^}]*)\}/)?.[1] ?? '').split(',').map((part) => part.trim()),
        ),
      );
      const declared = (name: string) =>
        new RegExp(`\\b(?:const|let|function|type|interface)\\s+${name}\\b`).test(body);
      const names = (list: Iterable<string>) =>
        [...list].filter((name) => !taken.has(name) && !declared(name));
      const head = [
        ...own,
        `import { ${names(publicExports).join(', ')} } from '@wideset/react';`,
        `import { ${names(['useCallback', 'useEffect', 'useId', 'useMemo', 'useRef', 'useState']).join(', ')} } from 'react';`,
        // Browser globals would otherwise answer for a name the sample only mentions (`open={open}`).
        ...['open', 'close', 'name', 'status', 'event', 'location', 'origin', 'top', 'parent']
          .filter((name) => new RegExp(`\\b${name}\\b`).test(body) && !declared(name))
          .filter((name) => !new RegExp(`\\[${name}\\b|\\(${name}\\b|\\{ ?${name}\\b`).test(body))
          .map((name) => `declare const ${name}: any;`),
      ].join('\n');
      // Statements up to the first line that opens JSX, then that JSX as the return value.
      const jsxAt = body.search(/^<[A-Za-z>]/m);
      const shapes = [
        `export const Sample = () => (<>\n${body}\n</>);`,
        body,
        jsxAt > 0
          ? `export function Sample() {\n${body.slice(0, jsxAt)}\nreturn (<>\n${body.slice(jsxAt)}\n</>);\n}`
          : '',
        `export function Sample() {\n${body}\n}`,
      ];
      const shape = shapes.find((candidate) => candidate && parses(`${head}\n${candidate}`));
      return `${head}\n${shape ?? body}\n`;
    };

    const LIB_CONFIG = join(LIBRARY, 'tsconfig.json');
    const config = ts.parseJsonConfigFileContent(
      ts.readConfigFile(LIB_CONFIG, ts.sys.readFile).config,
      ts.sys,
      LIBRARY,
    );
    const options: ts.CompilerOptions = {
      ...config.options,
      noEmit: true,
      skipLibCheck: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
    };
    const run = (virtual: Map<string, string>) => {
      const host = ts.createCompilerHost(options);
      const { fileExists, readFile, getSourceFile } = host;
      const norm = (path: string) => resolve(path);
      host.fileExists = (file) => virtual.has(norm(file)) || fileExists(file);
      host.readFile = (file) => virtual.get(norm(file)) ?? readFile(file);
      host.getSourceFile = (file, version, ...rest) => {
        const text = virtual.get(norm(file));
        return text !== undefined
          ? ts.createSourceFile(file, text, version)
          : getSourceFile(file, version, ...rest);
      };
      const program = ts.createProgram([...virtual.keys()], options, host);
      return ts
        .getPreEmitDiagnostics(program)
        .filter((d) => d.file && virtual.has(norm(d.file.fileName)));
    };

    // A sample is a fragment: names it only mentions (`team`, `setTeam`, `RiCheckLine`) are declared
    // as `any` so that what remains is a real complaint about Wideset's API.
    const virtual = new Map([...sources].map(([path, code]) => [resolve(path), wrap(code)]));
    const free = new Map<string, Set<string>>();
    for (const d of run(virtual)) {
      if (![2304, 2552, 18004, 2503].includes(d.code)) continue;
      const name = d.file!.text.slice(d.start, (d.start ?? 0) + (d.length ?? 0));
      const path = resolve(d.file!.fileName);
      if (!free.has(path)) free.set(path, new Set());
      free.get(path)!.add(name);
    }
    for (const [path, names] of free)
      virtual.set(
        path,
        `${[...names].map((name) => `declare const ${name}: any;`).join(' ')}\n${virtual.get(path)}`,
      );

    const origins = new Map([...origin].map(([path, name]) => [resolve(path), name]));
    const errors = run(virtual)
      // A sample leaves out what it is not about: no complaint about what it omits or leaves unused.
      .filter((d) => ![2741, 2739, 6133, 7006, 7031, 2307, 1308, 2347, 2695].includes(d.code))
      .map((d) => {
        const path = resolve(d.file!.fileName);
        return `${origins.get(path)}: ${ts.flattenDiagnosticMessageText(d.messageText, ' ').slice(0, 200)}\n    in: ${(sources.get([...origin.keys()].find((key) => resolve(key) === path)!) ?? '').trim().split('\n')[0]}`;
      });
    expect(errors).toEqual([]);
  }, 240_000);
});

describe('what a consumer gets', () => {
  it('has no repository paths, Figma ids or authoring notes', () => {
    const bad = allSpecs
      .filter((file) => !file.endsWith('AUTHORING.md'))
      .filter((file) =>
        /packages\/design-system|AUTHORING\.md|^figma:|^storybook:/m.test(
          specForConsumer(read(file)),
        ),
      )
      .map(label);
    expect(bad).toEqual([]);
  });

  it('indexes components from the hand-written lines and leaves out deprecated ones', () => {
    const index = componentIndex(read(join(SPECS, 'README.md')));
    expect(index).toMatch(/^- Select: /m);
    expect(index).not.toMatch(/^- Search: /m);
    expect(index).not.toMatch(/\]\(|\n#/);
    expect(index.split('\n').length).toBeGreaterThanOrEqual(40);
  });
});
