import type { TextInputProps } from '../text-input/TextInput.types';

/**
 * Props forwarded to `Search`.
 * Inherits the full `TextInput` API except for `children` (the composition is fixed:
 * leading search icon, input, optional clear button) and `type` (locked to `"search"`
 * for native semantics).
 *
 * @deprecated Use `TextInputProps` and compose the field from `TextInput`; see `Search`.
 */
export type SearchProps = Omit<TextInputProps, 'children' | 'type'> & {
  /** Renders the clear button while the input holds a value and is enabled. Defaults to `true`. */
  showClearButton?: boolean;
  /** Called after the value is cleared via the clear button, in both controlled and uncontrolled modes. */
  onClear?: () => void;
  /** Accessible label for the clear button. Defaults to `'Clear'`. */
  clearAriaLabel?: string;
};
