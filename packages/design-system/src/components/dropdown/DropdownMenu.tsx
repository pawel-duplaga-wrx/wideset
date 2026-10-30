import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import { DropdownMenuContent } from './DropdownMenuContent';
import { DropdownMenuItem } from './DropdownMenuItem';
import { DropdownMenuLabel } from './DropdownMenuLabel';
import { DropdownMenuPortal } from './DropdownMenuPortal';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';
import { DropdownMenuTrigger } from './DropdownMenuTrigger';

const DropdownMenu = ((props: DropdownMenuPrimitive.DropdownMenuProps) => (
  <DropdownMenuPrimitive.Root {...props} />
)) as React.FC<DropdownMenuPrimitive.DropdownMenuProps> & {
  Content: typeof DropdownMenuContent;
  Group: typeof DropdownMenuGroup;
  Item: typeof DropdownMenuItem;
  Label: typeof DropdownMenuLabel;
  Portal: typeof DropdownMenuPortal;
  RadioGroup: typeof DropdownMenuRadioGroup;
  Separator: typeof DropdownMenuSeparator;
  Trigger: typeof DropdownMenuTrigger;
  CheckboxItem: typeof DropdownMenuCheckboxItem;
  ItemIndicator: typeof DropdownMenuItemIndicator;
  Sub: typeof DropdownMenuPrimitive.Sub;
  SubTrigger: typeof DropdownMenuSubTrigger;
  SubContent: typeof DropdownMenuSubContent;
  RadioItem: typeof DropdownMenuRadioItem;
};

DropdownMenu.Content = DropdownMenuContent;
export const DropdownMenuGroup = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group>
>((props, ref) => (
  <DropdownMenuPrimitive.Group ref={ref} data-slot="dropdown-menu-group" {...props} />
));
DropdownMenuGroup.displayName = 'DropdownMenu.Group';
DropdownMenu.Group = DropdownMenuGroup;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Portal = DropdownMenuPortal;
export const DropdownMenuRadioGroup = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>
>((props, ref) => (
  <DropdownMenuPrimitive.RadioGroup ref={ref} data-slot="dropdown-menu-radio-group" {...props} />
));
DropdownMenuRadioGroup.displayName = 'DropdownMenu.RadioGroup';
DropdownMenu.RadioGroup = DropdownMenuRadioGroup;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.Trigger = DropdownMenuTrigger;
export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>((props, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    data-slot="dropdown-menu-checkbox-item"
    {...props}
  />
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenu.CheckboxItem';
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem;
export const DropdownMenuItemIndicator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.ItemIndicator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.ItemIndicator>
>((props, ref) => (
  <DropdownMenuPrimitive.ItemIndicator
    ref={ref}
    data-slot="dropdown-menu-item-indicator"
    {...props}
  />
));
DropdownMenuItemIndicator.displayName = 'DropdownMenu.ItemIndicator';
DropdownMenu.ItemIndicator = DropdownMenuItemIndicator;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
DropdownMenu.Sub = DropdownMenuSub;
export const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>((props, ref) => (
  <DropdownMenuPrimitive.SubTrigger ref={ref} data-slot="dropdown-menu-sub-trigger" {...props} />
));
DropdownMenuSubTrigger.displayName = 'DropdownMenu.SubTrigger';
DropdownMenu.SubTrigger = DropdownMenuSubTrigger;
export const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>((props, ref) => (
  <DropdownMenuPrimitive.SubContent ref={ref} data-slot="dropdown-menu-sub-content" {...props} />
));
DropdownMenuSubContent.displayName = 'DropdownMenu.SubContent';
DropdownMenu.SubContent = DropdownMenuSubContent;
export const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>((props, ref) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} data-slot="dropdown-menu-radio-item" {...props} />
));
DropdownMenuRadioItem.displayName = 'DropdownMenu.RadioItem';
DropdownMenu.RadioItem = DropdownMenuRadioItem;

DropdownMenu.displayName = 'DropdownMenu';

export { DropdownMenu, DropdownMenuPortal };
