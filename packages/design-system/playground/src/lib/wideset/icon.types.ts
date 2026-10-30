import type { RemixiconComponentType } from '@remixicon/react';
import type { ComponentProps } from 'react';

/**
 * Props a Remix icon accepts. The package exports the component type but not its
 * props, so derive them — needed by every `*.Icon` subcomponent that spreads the
 * caller's props onto the icon it renders.
 *
 * `RemixiconProps` is narrower than `SVGProps<SVGSVGElement>`: it drops `color`,
 * `size`, `width`, `height`, `fill` and `viewBox` (the package owns those) and
 * forbids `children`. Size and colour are set with utilities instead — see the
 * `.remixicon` rule in `src/styles/utilities/overrides.css`.
 */
export type RemixiconProps = Omit<ComponentProps<RemixiconComponentType>, 'color' | 'size'> & {
  children?: never;
};
