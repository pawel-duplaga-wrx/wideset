/**
 * The design tokens the Foundations pages list, read from the library's CSS so a page never
 * shows a token that is gone or misses one that was added. Values are not resolved here: the
 * pages paint every swatch and sample with `var(--…)`, so they follow light and dark with the
 * site and show exactly what a consumer gets.
 *
 * Output: src/generated/tokens.json
 *   palette     [{ family, steps: [{ step, name }] }]   light primitives, opacity variants left out
 *   colors      [{ kind, group, tokens: [{ name, className }] }]   semantic colour classes
 *   typography  [{ group, styles: [{ className, size, leading, tracking, weight }] }]
 *   zIndex      [{ name, className, value, note }]
 *   motion      [{ group, tokens: [{ name, value }] }]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { generatedDir, library } from './paths.mjs';

const styles = join(library, 'src/styles');
const read = (path) => readFileSync(join(styles, path), 'utf8');

// Palette: --ws-colors-light-<family>-<step>, in the order Figma names them.
const paletteSteps = new Map();
for (const [, family, step] of read('tokens/theme-base-tokens.css').matchAll(
  /--ws-colors-light-([a-z]+)-(\d+):/g,
)) {
  if (!paletteSteps.has(family)) paletteSteps.set(family, []);
  paletteSteps.get(family).push(Number(step));
}
const familyOrder = (family) => (family === 'neutral' ? 0 : family === 'brand' ? 1 : 2);
const palette = [...paletteSteps]
  .sort(([a], [b]) => familyOrder(a) - familyOrder(b) || a.localeCompare(b))
  .map(([family, steps]) => ({
    family,
    steps: [...new Set(steps)]
      .sort((a, b) => a - b)
      .map((step) => ({ step, name: `--ws-colors-light-${family}-${step}` })),
  }));

// Semantic colours: the classes components use. Grouped by kind (background, text, border)
// and by layer (static, dynamic, semantic, non-semantic).
const KINDS = [
  { kind: 'Background', prefix: 'background-color', utility: 'bg' },
  { kind: 'Text', prefix: 'text-color', utility: 'text' },
  { kind: 'Border', prefix: 'border-color', utility: 'border' },
];
const LAYERS = ['static', 'dynamic', 'semantic', 'non-semantic'];
const semantic = read('tokens/theme-light-semantic.css');
const colors = KINDS.flatMap(({ kind, prefix, utility }) => {
  const names = [
    ...new Set(
      [...semantic.matchAll(new RegExp(`--${prefix}-ws-([a-z0-9-]+):`, 'g'))].map((m) => m[1]),
    ),
  ];
  return LAYERS.map((layer) => ({
    kind,
    group: layer,
    tokens: names
      .filter(
        (name) =>
          name.startsWith(`${layer}-`) && !(layer === 'semantic' && name.startsWith('non-')),
      )
      .sort()
      .map((name) => ({ name: `--${prefix}-ws-${name}`, className: `${utility}-ws-${name}` })),
  })).filter((group) => group.tokens.length > 0);
});

// Typography: each `typography-*` utility and the four tokens it applies.
const typography = [];
for (const [, name, body] of read('utilities/typography.css').matchAll(
  /@utility typography-([a-z-]+) \{\s*@apply ([^;]+);/g,
)) {
  // A utility missing one of the four classes would print `var(--text-ws-undefined)`: fail.
  const part = (prefix) => {
    const cls = body.split(/\s+/).find((item) => item.startsWith(prefix));
    if (!cls) throw new Error(`gen-tokens: typography-${name} applies no ${prefix}* class`);
    return cls.slice(prefix.length);
  };
  const group = name.replace(/-(strong-)?(xs|sm|md|lg)$/, '');
  let entry = typography.find((item) => item.group === group);
  if (!entry) typography.push((entry = { group, styles: [] }));
  entry.styles.push({
    className: `typography-${name}`,
    size: `--text-ws-${part('text-ws-')}`,
    leading: `--leading-ws-${part('leading-ws-')}`,
    tracking: `--tracking-ws-${part('tracking-ws-')}`,
    weight: `--font-weight-ws-${part('font-ws-')}`,
  });
}

// Z-index bands, with the comment that says what each is for.
const zIndex = [
  ...read('utilities/z-index.css').matchAll(/--ws-z-index-([a-z]+): (-?\d+); \/\* (.+?) \*\//g),
].map(([, name, value, note]) => ({
  name: `--ws-z-index-${name}`,
  className: `z-ws-${name}`,
  value: Number(value),
  note,
}));

// Motion tokens by group (duration, ease, distance, scale, blur), first declaration wins.
const motionTokens = new Map();
for (const [, group, rest, value] of read('utilities/motion.css').matchAll(
  /--ws-motion-([a-z]+)-([a-z-]+):\s*([^;]+);/g,
)) {
  const name = `--ws-motion-${group}-${rest}`;
  if (!motionTokens.has(name)) motionTokens.set(name, { group, name, value: value.trim() });
}
const motion = [];
for (const token of motionTokens.values()) {
  let entry = motion.find((item) => item.group === token.group);
  if (!entry) motion.push((entry = { group: token.group, tokens: [] }));
  entry.tokens.push({ name: token.name, value: token.value });
}

// The CSS changed shape and a pattern above stopped matching: fail rather than ship an empty page.
for (const [label, list] of Object.entries({ palette, colors, typography, zIndex, motion })) {
  if (list.length === 0) throw new Error(`gen-tokens: no ${label} tokens found in the library CSS`);
}

writeFileSync(
  join(generatedDir, 'tokens.json'),
  `${JSON.stringify({ palette, colors, typography, zIndex, motion }, null, 2)}\n`,
);
