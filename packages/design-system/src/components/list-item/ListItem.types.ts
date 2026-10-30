import type { VariantProps } from 'class-variance-authority';
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { listItemVariants } from './ListItem.variants';
import type { ListItemContent } from './ListItemContent';
import type { ListItemDescription } from './ListItemDescription';
import type { ListItemLabel } from './ListItemLabel';
import type { ListItemPrefix } from './ListItemPrefix';
import type { ListItemSuffix } from './ListItemSuffix';

/** A composable row used within menus and selection controls. */
export type ListItemProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof listItemVariants> &
  MotionProps & {
    /** Selection state. The checked state displays a checkmark when enabled. */
    'data-state'?: 'checked' | 'unchecked';
    /** Applies disabled styling for consumers such as Radix menu items. */
    'data-disabled'?: boolean;
    /** Disables the item and applies disabled styling. */
    disabled?: boolean;
    /** Allows a checkmark to appear for checked items. Defaults to `true`. */
    shouldDisplayCheckmark?: boolean;
  };

export type ListItemWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<ListItemProps> & RefAttributes<HTMLDivElement>
> & {
  Content: typeof ListItemContent;
  Description: typeof ListItemDescription;
  Label: typeof ListItemLabel;
  Prefix: typeof ListItemPrefix;
  Suffix: typeof ListItemSuffix;
};

/** Leading slot of the list item, such as an icon, avatar or checkbox. */
export type ListItemPrefixProps = HTMLAttributes<HTMLDivElement>;

/** Trailing slot of the list item, such as a badge, shortcut or chevron. */
export type ListItemSuffixProps = HTMLAttributes<HTMLDivElement>;

/** The content surface rendered within `ListItem`. */
export type ListItemContentProps = HTMLAttributes<HTMLDivElement>;

/** The text label associated with `ListItem`. */
export type ListItemLabelProps = HTMLAttributes<HTMLDivElement>;

/** Supporting descriptive text. */
export type ListItemDescriptionProps = HTMLAttributes<HTMLDivElement>;
