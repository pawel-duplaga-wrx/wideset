import type { CheckedState } from '@radix-ui/react-checkbox';
import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type {
  DropdownMenuGroupProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
  DropdownMenuTriggerProps,
} from '../dropdown/DropdownMenu.types';
import type { ListItemProps } from '../list-item/ListItem.types';
import type { SelectContentProps } from '../select/Select.types';
import type { selectTriggerVariants } from '../select/Select.variants';

type MultiSelectSize = VariantProps<typeof selectTriggerVariants>['size'];
type MultiSelectPreset = VariantProps<typeof selectTriggerVariants>['preset'];
type MultiSelectVariant = VariantProps<typeof selectTriggerVariants>['variant'];

export type MultiSelectOptionType<T extends Record<string, unknown> = Record<string, unknown>> = {
  /** Unique identifier used as the option's value. */
  value: string;
  /** Display text shown in the dropdown list and as a tag once selected. */
  label: string;
  /** Whether this option is disabled and unselectable. */
  disabled?: boolean;
  /** Optional element (icon, avatar, or text) rendered before the label. */
  prefix?: React.ReactNode;
  /** Color variant for the option row. `danger` renders red text for destructive choices. */
  variant?: ListItemProps['variant'];
} & T;

/** A selection control for multiple options. */
export type MultiSelectProps = {
  /** Sub-components for composable usage (`MultiSelect.Trigger`, `MultiSelect.Content`, `MultiSelect.Option`, etc.). Use instead of `options` when you need full rendering control. */
  children?: React.ReactNode;
  /** Array of options to display in the dropdown. Each item requires `value` and `label`. */
  options?: MultiSelectOptionType[];
  /** Controlled selected values. Each element must match an option's `value`. Use with `onValueChange`. */
  value?: string[];
  /** Initial selected values for uncontrolled usage. */
  defaultValue?: string[];
  /** Called when the selection changes. Receives the updated array of selected values. */
  onValueChange?: (value: string[]) => void;
  /** Disables the trigger and all options. */
  disabled?: boolean;
  /** Whether to show a clear button when at least one value is selected. */
  clearable?: boolean;
  /** Called when the clear button is clicked. */
  onClear?: () => void;
  /**
   * Controls how selected values are displayed in the trigger:
   * - **`undefined` (default)** — all tags are always shown; the trigger grows in height to fit them.
   * - **`0`** — always shows the aggregated summary label (e.g. `"3 values selected"`), never individual tags.
   * - **`>= 1`** — shows individual tags while the count is within this limit; collapses to the summary label once exceeded.
   */
  maxVisibleTags?: number;
  /** Label used in the aggregated summary text, e.g. setting `"countries"` produces `"3 countries"`. Defaults to `"value selected"` / `"values selected"` (pluralized automatically) when omitted. */
  multiValuesLabel?: string;
  /** DOM node to portal the dropdown content into. Defaults to `document.body`. */
  portalContainer?: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container'];
  /** Controls the height, padding, and typography size of the trigger and tags. */
  size?: MultiSelectSize;
  /** Visual style preset. `border` adds a visible border and background; `ghost` uses a transparent background. */
  preset?: MultiSelectPreset;
  /** Color variant. `danger` applies error styling for form validation feedback. */
  variant?: MultiSelectVariant;
  /** Whether to hide the dropdown arrow icon on the right side of the trigger. */
  hideArrow?: boolean;
  /** Placeholder text shown in the trigger when no option is selected. */
  placeholder?: string;
  /** HTML `id` attribute for the trigger element, useful for form label association. */
  id?: string;
  /** HTML `name` attribute forwarded for form submission. */
  name?: string;
  /** Additional CSS classes applied to the trigger element. */
  className?: string;
  /** Whether to show a "Select all" / "Deselect all" option at the top of the dropdown. When used with `hasSearch`, applies only to the currently visible (filtered) options. */
  hasSelectAll?: boolean;
  /** Whether to show a search input at the top of the dropdown that filters options by label. */
  hasSearch?: boolean;
  /** Label shown when `hasSearch` is enabled and the search query matches no options. Pass a translated string for internationalization. Defaults to `"No results found"`. */
  noResultsLabel?: string;
  /** Label for the "select all" toggle when no options (or some) are selected. Defaults to `'Select all'`. */
  selectAllLabel?: string;
  /** Label for the "select all" toggle when all options are selected. Defaults to `'Deselect all'`. */
  deselectAllLabel?: string;
  /** Accessible label for the clear-selection button. Defaults to `'Clear selection'`. */
  clearSelectionAriaLabel?: string;
  /** Controlled open state of the dropdown. Use with `onOpenChange` to manage open/close externally. */
  open?: boolean;
  /** Initial open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Called when the dropdown opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Whether the dropdown should be modal, blocking interaction with the rest of the page when open. */
  modal?: boolean;
} & MotionProps &
  Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'onChange' | 'value' | 'defaultValue' | 'disabled' | 'onClear' | 'name' | 'id'
  >;

/** The rendered selected values and their labels. */
export type MultiSelectValueProps = {
  /** Whether any values are currently selected. */
  hasValue: boolean;
  /** Placeholder text shown when no values are selected. */
  placeholder?: string;
  /** Whether individual tags should be rendered (true when selection count is within `maxVisibleTags`). */
  areTagsVisible: boolean;
  /** Currently selected options with their labels for display. */
  selectedOptions: {
    /** Value identifying the selected option. */
    value: string;
    /** Label displayed for the selected option. */
    label: string;
  }[];
  /** Size inherited from the parent MultiSelect. */
  size: MultiSelectProps['size'];
  /** Whether the clear button is currently visible, used to add right padding to avoid overlap. */
  hasClearButton?: boolean;
  /** Label used in the aggregated summary text. */
  multiValuesLabel?: string;
  /** Called when a tag's remove button is activated. */
  onRemoveValue: (value: string) => void;
  /** When true, tags wrap to multiple lines and the trigger grows in height. */
  wrap?: boolean;
} & MotionProps;

/** A selectable option within the dropdown. */
export type MultiSelectOptionProps = {
  /** The option data to render. */
  option: MultiSelectOptionType;
  /** Whether the option is disabled and uninteractable. */
  isDisabled: boolean;
  /** Called when the option is selected or deselected. */
  onSelect: () => void;
} & MotionProps &
  (
    | {
        /** Whether this option is selected. */
        isSelected: boolean;
      }
    | {
        /** Checked state displayed for an option containing partially selected children. */
        indeterminateState: CheckedState;
      }
  );

/** `MultiSelect.Trigger` is `DropdownMenu.Trigger`; same props. */
export type MultiSelectTriggerProps = DropdownMenuTriggerProps;

/** `MultiSelect.Content` is `Select.Content`; same props. */
export type MultiSelectContentProps = SelectContentProps;

/** `MultiSelect.Group` is `DropdownMenu.Group`; same props. */
export type MultiSelectGroupProps = DropdownMenuGroupProps;

/** `MultiSelect.Label` is `DropdownMenu.Label`; same props. */
export type MultiSelectLabelProps = DropdownMenuLabelProps;

/** `MultiSelect.Separator` is `DropdownMenu.Separator`; same props. */
export type MultiSelectSeparatorProps = DropdownMenuSeparatorProps;
