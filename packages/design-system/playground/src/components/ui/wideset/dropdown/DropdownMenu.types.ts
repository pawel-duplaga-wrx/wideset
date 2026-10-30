import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type * as React from 'react';

import type { MotionProps } from '@/lib/wideset/motion/Motion.types';
import type { ListItemProps } from '../list-item/ListItem.types';

/** An anchored menu of contextual actions. */
export type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;

/** The control that opens or toggles the associated content. */
export type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>;

/** The content surface rendered within `DropdownMenu`. */
export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
> &
  MotionProps & {
    /** DOM node to portal the content into. Defaults to `document.body`. */
    portalContainer?: Element | DocumentFragment | null;
  };

/** An individual item within `DropdownMenu`. */
export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> &
  ListItemProps;

/** The text label associated with `DropdownMenu`. */
export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> & {
  /** Indents the label so it aligns with item text in menus that have a leading icon or checkmark slot. */
  inset?: boolean;
};

/** A visual separator between groups of items. */
export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>;

/** A container grouping related items. */
export type DropdownMenuGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Group
>;

/** The portal destination for floating content. */
export type DropdownMenuPortalProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>;

/** A group of mutually exclusive radio options. */
export type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioGroup
>;
