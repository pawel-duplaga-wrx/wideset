import { useSyncExternalStore } from 'react';

/**
 * Where the code samples import components from: the npm package, or the reader's own
 * project after `npx wideset add`. One choice for the whole site, remembered in the browser;
 * every code block with a component import follows it.
 */
export type ImportSource = 'package' | 'project';

const KEY = 'wideset-docs-import-source';
const listeners = new Set<() => void>();

const read = (): ImportSource => {
  try {
    return localStorage.getItem(KEY) === 'project' ? 'project' : 'package';
  } catch {
    return 'package';
  }
};

export const setImportSource = (source: ImportSource) => {
  try {
    localStorage.setItem(KEY, source);
  } catch {
    // storage unavailable: the choice lasts for this page only
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => event.key === KEY && listener();
  addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    removeEventListener('storage', onStorage);
  };
};

export const useImportSource = () =>
  useSyncExternalStore(subscribe, read, () => 'package' as ImportSource);

export const PACKAGE = '@wideset/react';

/** `{ Button: '@/components/ui/wideset/button/Button' }`: where each export lives once scaffolded. */
export type ProjectPaths = Record<string, string>;

/** Import lines for these names, from the package or grouped by their scaffolded file. */
export const importLines = (names: string[], source: ImportSource, paths: ProjectPaths) => {
  const sorted = [...new Set(names)].sort();
  if (!sorted.length) return [];
  if (source === 'package') return [`import { ${sorted.join(', ')} } from '${PACKAGE}';`];
  const byPath = new Map<string, string[]>();
  for (const name of sorted) {
    const path = paths[name] ?? PACKAGE;
    byPath.set(path, [...(byPath.get(path) ?? []), name]);
  }
  return [...byPath].map(([path, list]) => `import { ${list.join(', ')} } from '${path}';`);
};

/**
 * The same code with its package import rewritten for the chosen source. Code that does
 * not import the package is returned as it is.
 */
export const withImportSource = (code: string, source: ImportSource, paths: ProjectPaths) => {
  if (source === 'package') return code;
  const pattern = new RegExp(`import\\s*\\{([^}]*)\\}\\s*from\\s*'${PACKAGE}';?`, 'g');
  return code.replace(pattern, (_, list: string) =>
    importLines(
      list
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean),
      source,
      paths,
    ).join('\n'),
  );
};
