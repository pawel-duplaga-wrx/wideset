import { cva } from 'class-variance-authority';
import { cn } from 'src/lib/utils';

/**
 * Figma draws the tile outline *inside* the 64px frame, so a CSS `border` would
 * add 2px to the auto height and push content to 13/17px from the edge. The
 * outline is an inset ring instead, which lands the frame at exactly 64px with
 * content 12/16px from the edge.
 *
 * Ring colours go through `inset-ring-[var(--dynamic-stroke-*)]` rather than
 * `border-*` classes because the generated semantic CSS has no `--ring-color-*`
 * namespace. Adding one belongs in the token pipeline, not here.
 */
const TILE_BASE = cn(
  'group bg-ws-static-highlight-base rounded-ws-container-md min-h-ws-20 gap-ws-5 px-ws-9 py-ws-7 flex items-center inset-ring',
);

/** Static tile: a plain container with the default outline and no interaction states. */
export const tileVariants = cva(
  cn(TILE_BASE, 'inset-ring-[var(--ws-dynamic-stroke-secondary-default)]'),
);

/**
 * `Tile.Checkbox` and `Tile.Radio` are rooted on a Radix primitive, so selection
 * state arrives as `data-state` rather than as a prop. Every state pairs the
 * checked/unchecked variant with `disabled:` explicitly, the way
 * `Checkbox.variants.ts` does: Tailwind orders variants by its own rules, not by
 * class-string order, so `disabled:` and `radix-state-checked:` would otherwise
 * race and the winner would depend on the generated CSS order.
 */
export const selectableTileVariants = cva(
  cn(
    TILE_BASE,
    'focus-visible:outline-ws-dynamic-primary-strong-default focus-visible:wds-focus-visible',
    'w-full cursor-pointer text-left',
    // unselected
    'radix-state-unchecked:inset-ring-[var(--ws-dynamic-stroke-secondary-default)]',
    'radix-state-unchecked:hover:inset-ring-[var(--ws-dynamic-stroke-secondary-hover)]',
    'radix-state-unchecked:active:inset-ring-[var(--ws-dynamic-stroke-secondary-pressed)]',
    // selected
    'radix-state-checked:bg-ws-static-highlight-strong',
    'radix-state-checked:outline-ws-dynamic-primary-default/20 radix-state-checked:outline-2',
    'radix-state-checked:inset-ring-[var(--ws-dynamic-stroke-primary-strong-default)]',
    'radix-state-checked:hover:inset-ring-[var(--ws-dynamic-stroke-primary-strong-hover)]',
    'radix-state-checked:active:inset-ring-[var(--ws-dynamic-stroke-primary-strong-pressed)]',
    // disabled, paired with both selection states so neither can win on CSS order
    'disabled:is-disabled disabled:pointer-events-none disabled:cursor-default',
    'radix-state-unchecked:disabled:inset-ring-[var(--ws-dynamic-stroke-secondary-disabled)]',
    'radix-state-checked:disabled:bg-ws-static-highlight-base',
    'radix-state-checked:disabled:outline-0',
    'radix-state-checked:disabled:inset-ring-[var(--ws-dynamic-stroke-secondary-disabled)]',
  ),
);

/**
 * The switch visual inside a selectable tile, as a non-interactive copy.
 *
 * It cannot be the real `Switch`: that renders a `<button>`, and the tile root
 * is already a `<button role="checkbox">`. A button inside a button is invalid
 * HTML and an axe `nested-interactive` failure. Mantine draws the same
 * distinction with `Checkbox.Indicator`: it looks like the control and
 * deliberately is not one.
 *
 * State comes from the tile root's `data-state` via `group-radix-state-checked:`,
 * so the classes parallel `switchVariants` rather than reusing it, because those
 * key off `data-state` on the switch itself.
 */
export const tileIndicatorTrackVariants = cva(
  cn(
    'relative shrink-0 rounded-full transition-colors',
    'h-ws-control-md w-ws-control-xxl',
    'bg-ws-dynamic-secondary-alpha-strong-default',
    'group-radix-state-checked:bg-ws-dynamic-primary-default',
    'group-disabled:bg-ws-dynamic-secondary-disabled',
    'group-radix-state-checked:group-disabled:bg-ws-dynamic-primary-disabled',
  ),
);

export const tileIndicatorThumbVariants = cva(
  cn(
    'absolute top-1/2 left-0 shrink-0 -translate-y-1/2 transform rounded-full transition-transform',
    'h-ws-control-sm w-ws-control-sm',
    'shadow-ws-medium bg-(--ws-dynamic-text-on-primary-default)',
    'translate-x-(--spacing-ws-2)',
    'group-radix-state-checked:translate-x-[calc(100%-var(--spacing-ws-2))]',
    'group-disabled:bg-(--ws-dynamic-text-on-primary-disabled) group-disabled:shadow-none',
  ),
);
