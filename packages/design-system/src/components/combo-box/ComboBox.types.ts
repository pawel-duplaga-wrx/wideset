import type React from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { ListItem } from '../list-item/ListItem';
import type { Popup } from '../popup/Popup';
import type { SelectOptionType, SelectProps } from '../select/Select.types';
import type { TextInput } from '../text-input/TextInput';
import type { TextInputIconProps, TextInputProps } from '../text-input/TextInput.types';
import type { TextInputPrefixProps } from '../text-input/TextInputPrefix';
import type { ComboBoxContent } from './ComboBoxContent';
import type { ComboBoxItem } from './ComboBoxItem';
import type { ComboBoxTrigger } from './ComboBoxTrigger';

/** A searchable selection control that can accept custom values. Name it with `aria-label` or `aria-labelledby`; a `<label htmlFor>` does not reach it. */
export type ComboBoxProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children' | 'className' | 'onChange' | 'defaultValue'
> &
  MotionProps & {
    /** Sub-components for composable usage (`ComboBox.Trigger`, `ComboBox.Content`, `ComboBox.Item`). Use instead of the default rendering when you need custom layouts or full rendering control. */
    children?: React.ReactNode;
    /** Array of options to display in the dropdown. Each item requires `value` and `label`. */
    options?: SelectProps['options'];
    /** Placeholder text shown in the trigger when no option is selected and no custom value is typed. */
    placeholder?: string;
    /** Additional CSS classes applied to the trigger element. Width utilities (e.g. `w-[20rem]`) override the default width. */
    className?: string;
    /** Controls the height, padding, and typography size of the trigger and its filter input. */
    size?: SelectProps['size'];
    /** Visual style preset. `border` adds a visible border and background; `ghost` uses a transparent background. */
    preset?: SelectProps['preset'];
    /** Color variant. `danger` applies error styling for form validation feedback. */
    variant?: SelectProps['variant'];
    /** Whether to show a clear button in the trigger when a value is selected or text is typed. */
    clearable?: boolean;
    /** Called when the clear button is clicked. Use for custom reset logic beyond clearing the value. */
    onClear?: () => void;
    /** Disables the combobox: it cannot be opened, typed into, or cleared, and is removed from the tab order. */
    disabled?: boolean;
    /** Restricts the value to existing options. When enabled, typed text only filters the list instead of becoming a custom value; clearing the input deselects. */
    disallowCustomValue?: boolean;
    /** Controlled selected value. Matches an option `value`, or any custom string when custom values are allowed. */
    value?: string;
    /** Initial value for uncontrolled usage. Seeds the selection on first render only; ignored afterwards. */
    defaultValue?: string;
    /** Called when the selected option or typed custom value changes. Receives the next string value and fires in both controlled and uncontrolled modes. */
    onChange?: (value: string) => void;
    /** Accessible label for the clear-selection button rendered in the trigger. Defaults to `'Clear selection'`. */
    clearSelectionAriaLabel?: string;
  };

export type ComboBoxWithSubComponents = React.FC<ComboBoxProps> & {
  Trigger: typeof ComboBoxTrigger;
  Content: typeof ComboBoxContent;
  Item: typeof ComboBoxItem;
  Prefix: typeof TextInput.Prefix;
  Icon: typeof TextInput.Icon;
};

export type ComboBoxOption = SelectOptionType;

/** The content surface rendered within `ComboBox`. */
export type ComboBoxContentProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> &
  MotionProps & {
    /** Composed content, or a render function called for each filtered option. */
    children?: React.ReactNode | ((option: ComboBoxOption) => React.ReactNode);
  };

/** An option label with matching search text highlighted. */
export type ComboBoxHighlightedLabelProps = {
  /** Option label whose matching text is highlighted. */
  label: string;
  /** Search text to highlight within the label. */
  search: string;
};

/** Props for the combo box root, which holds the options and value state and wraps a `Popup`. */
export type ComboBoxRootProps = React.ComponentProps<typeof Popup> &
  MotionProps & {
    /** Options available for selection. */
    options?: ComboBoxOption[];
    /** Controlled value. Pair with the change callback to update it. */
    value?: string;
    /** Initial value for uncontrolled usage; subsequent changes are ignored. */
    defaultValue?: string;
    /** Shows a clear button when a value is selected. */
    clearable?: boolean;
    /** Restricts selection to the supplied options; typed text filters the list. */
    disallowCustomValue?: boolean;
    /** Disables interaction with the control. */
    disabled?: boolean;
    /** Called with the next value in both controlled and uncontrolled usage. */
    onChange?: (value: string) => void;
    /** Called when the clear button resets the selection. */
    onClear?: () => void;
  };

/** An individual item within `ComboBox`. */
export type ComboBoxItemProps = React.ComponentPropsWithoutRef<'li'> &
  MotionProps & {
    /** Option value this item represents. Must match the `value` of an option passed to the parent `ComboBox` to inherit its label, prefix, and disabled state. */
    value: string;
    /** Overrides the selected state. By default derived from the parent `ComboBox` value. */
    isSelected?: boolean;
    /** Overrides the keyboard-highlight state. By default derived from the parent `ComboBox` arrow-key navigation. */
    isHighlighted?: boolean;
    /** Disables the item: it cannot be selected and is skipped during keyboard navigation. Defaults to the matching option's `disabled` flag. */
    disabled?: boolean;
    /** Visual variant of the row. `danger` renders the item in error colors (e.g. destructive actions). Defaults to the matching option's `variant`. */
    variant?: React.ComponentProps<typeof ListItem>['variant'];
  };

/** The control that opens or toggles the associated content. */
export type ComboBoxTriggerProps = React.ComponentPropsWithoutRef<'div'> &
  MotionProps & {
    /** Controls the height, padding, and typography size of the trigger. */
    size?: TextInputProps['size'];
    /** Color variant. `danger` applies error styling for form validation feedback. */
    variant?: ComboBoxProps['variant'];
    /** Visual style preset. `border` adds a visible border and background; `ghost` uses a transparent background. */
    preset?: TextInputProps['preset'];
    /** Disables the trigger: it cannot be opened, typed into, or cleared, and is removed from the tab order. */
    disabled?: boolean;
    /** Whether the trigger renders a `ComboBox.Prefix` — removes the left padding so the prefix sits flush. Detected automatically in the simple (non-composed) mode. */
    hasPrefix?: boolean;
    /** Overrides the open state. By default derived from the parent `ComboBox`. */
    open?: boolean;
    /** Ref to the filter input rendered while open. By default provided by the parent `ComboBox`. */
    inputRef?: React.RefObject<HTMLInputElement | null>;
    /** Overrides the filter input value. By default derived from the parent `ComboBox` search/selection state. */
    inputValue?: string;
    /** Overrides the label shown in the closed trigger. By default the selected option's label (or the custom value). */
    displayedLabel?: string;
    /** Placeholder text shown when no option is selected. */
    placeholder?: string;
    /** Overrides whether the clear button is shown. By default derived from the parent `ComboBox` `clearable` prop and current value. */
    hasClearButton?: boolean;
    /** Accessible label for the clear-selection button. Defaults to `'Clear selection'`. */
    clearSelectionAriaLabel?: string;
    /** Called with the new text whenever the filter input changes. Fires in addition to the parent `ComboBox` filtering. */
    onInputChange?: (value: string) => void;
    /** Keydown handler for the filter input. Fires in addition to the built-in keyboard navigation. */
    onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    /** Blur handler for the filter input. Fires in addition to the built-in close-on-blur behavior. */
    onInputBlur?: React.FocusEventHandler<HTMLInputElement>;
  };

export type ComboBoxContextValue = Pick<ComboBoxRootProps, 'options' | 'disallowCustomValue'> &
  Pick<
    ComboBoxTriggerProps,
    | 'open'
    | 'inputRef'
    | 'displayedLabel'
    | 'inputValue'
    | 'hasClearButton'
    | 'onInputChange'
    | 'onInputKeyDown'
    | 'onInputBlur'
  > & {
    contentId: string;
    onOpenChange: (open: boolean) => void;
    currentValue: string;
    search: string;
    filteredOptions: ComboBoxOption[];
    highlightedIndex: number;
    getOptionId?: (index: number) => string;
    activeDescendantId?: string;
    onSelect: (option: ComboBoxOption) => void;
    onItemMouseEnter: (index: number) => void;
    onClear: (event: React.MouseEvent<HTMLButtonElement>) => void;
    motion?: boolean;
  };

/** `ComboBox.Icon` is `TextInput.Icon`; same props. */
export type ComboBoxIconProps = TextInputIconProps;

/** `ComboBox.Prefix` is `TextInput.Prefix`; same props. */
export type ComboBoxPrefixProps = TextInputPrefixProps;
