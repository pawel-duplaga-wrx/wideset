import type { RemixiconComponentType } from '@remixicon/react';
import type { VariantProps } from 'class-variance-authority';
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

import type { tagVariants } from './Tag.variants';
import type { TagIcon } from './TagIcon';

export type TagContextValue = {
  size: VariantProps<typeof tagVariants>['size'];
  color: VariantProps<typeof tagVariants>['color'];
};

/** A compact descriptive label with optional icon. */
export type TagProps = {
  /** When true, truncates overflowing text with an ellipsis. */
  truncate?: boolean;
  /** When true, renders the tag as an icon-only variant with equal padding on all sides. */
  iconOnly?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'color'> &
  VariantProps<typeof tagVariants>;

export type TagWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<TagProps> & RefAttributes<HTMLDivElement>
> & {
  Icon: typeof TagIcon;
};

/** An icon rendered within `Tag`. */
export type TagIconProps = HTMLAttributes<HTMLDivElement> & {
  /** Icon component from `@remixicon/react`. */
  icon: RemixiconComponentType;
};
