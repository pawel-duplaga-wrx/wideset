import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

/*
  The 'use client' directive belongs on component modules, never on the barrel. A client barrel
  makes every React Server Component reference point at the whole barrel, so Next.js bundles the
  entire library for a page that imports one Button. Checked against dist/, so it runs after
  `pnpm build:lib` (CI builds before it tests) and is skipped locally without a build.
*/
const DIST = resolve(__dirname, '../../dist');
const hasDist = existsSync(join(DIST, 'index.mjs'));

const startsWithDirective = (file: string) =>
  /^["']use client["'];/.test(readFileSync(file, 'utf8'));

const esModules = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return esModules(path);
    return name.endsWith('.mjs') ? [path] : [];
  });

describe.skipIf(!hasDist)('client boundary in dist/', () => {
  it('keeps the barrel and the utils entry server-safe', () => {
    expect(startsWithDirective(join(DIST, 'index.mjs'))).toBe(false);
    expect(startsWithDirective(join(DIST, 'utils.mjs'))).toBe(false);
  });

  it('marks every component and hook module as a client module', () => {
    const unmarked = [
      ...esModules(join(DIST, 'components')),
      ...esModules(join(DIST, 'hooks')),
    ].filter((file) => !startsWithDirective(file));
    expect(unmarked).toEqual([]);
  });

  it('ships the package as one file per module', () => {
    expect(esModules(join(DIST, 'components')).length).toBeGreaterThan(50);
  });
});
