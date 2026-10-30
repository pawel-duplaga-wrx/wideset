import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type * as SelectPrimitive from '@radix-ui/react-select';
import type { VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import type { MotionProps } from '@/lib/wideset/motion/Motion.types';
import type { ListItemProps } from '../list-item/ListItem.types';
import type { selectContentVariants, selectTriggerVariants } from './Select.variants';

/** Props for the Radix Select root, which holds open and value state and renders no DOM. */
export type SelectRootProps = React.ComponentProps<typeof SelectPrimitive.Root>;

export type SelectContextValue = {
  motion?: boolean;
};

/** The control that opens or toggles the associated content. */
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
  MotionProps & {
    /** Controls the height, padding, and typography size of the trigger. */
    size?: VariantProps<typeof selectTriggerVariants>['size'];
    /** Visual style preset. `border` adds a visible border and background; `ghost` uses a transparent background. */
    preset?: VariantProps<typeof selectTriggerVariants>['preset'];
    /** Color variant. `danger` applies error styling for form validation feedback. */
    variant?: VariantProps<typeof selectTriggerVariants>['variant'];
    /** Whether to hide the dropdown arrow icon on the right side of the trigger. */
    hideArrow?: boolean;
    /** Placeholder text shown when no value is selected. Also used as the accessible label fallback. */
    placeholder?: string;
    /** HTML `id` attribute forwarded to the trigger element for form label association. */
    id?: string;
    /** HTML `name` attribute forwarded for form submission. */
    name?: string;
    /** Internal flag — set to `false` to render a plain `<button>` instead of the Radix Select trigger (used inside Dropdown). */
    shouldUsePrimitive?: boolean;
  };

/** The content surface rendered within `Select`. */
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> &
  MotionProps & {
    /** Controls how the dropdown is positioned relative to the trigger. */
    position?: VariantProps<typeof selectContentVariants>['position'];
    /** Internal flag — set to `false` to render as a `DropdownMenu.Content` instead of the Radix Select portal (used inside Dropdown). */
    shouldUsePrimitive?: boolean;
    /** DOM node to portal the dropdown content into. Defaults to `document.body`. */
    portalContainer?:
      | React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container']
      | React.ComponentProps<typeof SelectPrimitive.Portal>['container'];
  };

/** Props shared by both option renderings. */
type SelectOptionSharedProps = MotionProps & {
  /** Color variant applied to the option row. `danger` renders red text for destructive choices. */
  variant?: ListItemProps['variant'];
  /** Whether to show a checkmark indicator on the selected option. */
  shouldDisplayCheckmark?: boolean;
};

/** Option rendered as a Radix Select item (the default). */
type SelectOptionPrimitiveProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> &
  SelectOptionSharedProps & {
    /** Internal flag — omit or set to `true` to use the Radix Select item primitive. */
    shouldUsePrimitive?: true;
  };

/** Option rendered as a plain `<div>`, used inside Dropdown. */
type SelectOptionNonPrimitiveProps = React.ComponentPropsWithoutRef<'div'> &
  SelectOptionSharedProps & {
    /** Internal flag — set to `false` to render as a plain `<div>` (used inside Dropdown). */
    shouldUsePrimitive: false;
    /** Disables interaction with the control. */
    disabled?: boolean;
    value?: never;
    textValue?: never;
  };

/** A selectable option within the dropdown. */
export type SelectOptionProps = SelectOptionPrimitiveProps | SelectOptionNonPrimitiveProps;

/** The option row content. */
export type SelectOptionBodyProps = React.ComponentPropsWithoutRef<'div'> &
  MotionProps & {
    /** Color variant applied to the list item row. */
    variant?: SelectOptionProps['variant'];
    /** Whether the option is disabled visually and functionally. */
    disabled?: boolean;
    /** Whether to render the checkmark indicator when the option is selected. */
    shouldDisplayCheckmark?: boolean;
  };

/** The content area within an option. */
export type SelectOptionContentProps = Pick<SelectOptionProps, 'children'> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

/** Props passed to the Radix Select item when the option uses the primitive. */
export type SelectPrimitiveItemProps = Omit<
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
  'children' | 'className' | 'disabled' | 'value' | 'textValue'
>;

/** Props passed to the plain `<div>` when the option renders outside Radix Select. */
export type SelectOptionBodyElementProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children' | 'className' | 'disabled'
>;

/** The text label associated with `Select`. */
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>;

/** A visual separator between groups of items. */
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>;

/** Props for `Select.Group` — the Radix Select group. */
export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group>;

/** Props for `Select.Value` — renders the selected value inside the trigger. */
export type SelectValueProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>;

/** Props for `Select.ItemText`. */
export type SelectItemTextProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText>;

/** Props for `Select.ItemIndicator`. */
export type SelectItemIndicatorProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ItemIndicator
>;

/** Search input inside the dropdown for filtering options. */
export type SelectSearchProps = {
  /** Current search query value for controlled usage. */
  value?: string;
  /** Called when the search input value changes. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Called when the clear button inside the search input is clicked. */
  onClear?: () => void;
  /** Additional CSS classes applied to the search wrapper. */
  className?: string;
};

/** Button that scrolls the option list up when it overflows. */
export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollUpButton
>;

/** Button that scrolls the option list down when it overflows. */
export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollDownButton
>;

export type SelectOptionType<T extends Record<string, unknown> = Record<string, unknown>> = {
  /** Unique identifier submitted to `onValueChange` when this option is selected. */
  value: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>['value'];
  /** Display text shown in the dropdown list and in the trigger once selected. */
  label: string;
  /** Whether this option is disabled and unselectable. */
  disabled?: boolean;
  /** Optional element (icon, avatar, or text) rendered before the label. */
  prefix?: React.ReactNode;
  /** Color variant for the option row. `danger` renders red text for destructive choices. */
  variant?: ListItemProps['variant'];
} & T;

/** A dropdown selection control for one value. */
export type SelectProps = {
  /** Sub-components for composable usage (`Select.Trigger`, `Select.Content`, `Select.Option`, etc.). Use instead of `options` when you need grouped options, custom layouts, or full rendering control. */
  children?: React.ReactNode;
  /** Array of options to display in the dropdown. Each item requires `value` and `label`. */
  options?: SelectOptionType[];
  /** Placeholder text shown in the trigger when no option is selected. */
  placeholder?: string;
  /** Additional CSS classes applied to the trigger element. Width utilities (e.g. `w-[20rem]`) override the default width. */
  className?: string;
  /** Controls the height, padding, and typography size of the trigger. */
  size?: SelectTriggerProps['size'];
  /** Visual style preset. `border` adds a visible border and background; `ghost` uses a transparent background. */
  preset?: SelectTriggerProps['preset'];
  /** Color variant. `danger` applies error styling for form validation feedback. */
  variant?: SelectTriggerProps['variant'];
  /** Whether to hide the dropdown arrow icon on the right side of the trigger. */
  hideArrow?: boolean;
  /** Whether to show a clear button in the trigger when a value is selected. */
  clearable?: boolean;
  /** Called when the clear button is clicked. Use for custom reset logic beyond clearing the value. */
  onClear?: () => void;
  /** HTML `id` attribute for the trigger element, useful for form label association. */
  id?: string;
  /** HTML `name` attribute forwarded for form submission. */
  name?: string;
  /** Whether to show a search input at the top of the dropdown that filters options by label. */
  hasSearch?: boolean;
  /** Accessible label for the clear-selection button. Defaults to `'Clear selection'`. */
  clearSelectionAriaLabel?: string;
} & MotionProps &
  SelectRootProps &
  Omit<
    React.HTMLAttributes<HTMLButtonElement>,
    'onValueChange' | 'value' | 'defaultValue' | 'disabled' | 'onClear' | 'onChange' | 'name' | 'id'
  >;
