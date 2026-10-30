import type { RemixiconComponentType } from '@remixicon/react';
import type { VariantProps } from 'class-variance-authority';
import type {
  ComponentProps,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  MouseEventHandler,
  PropsWithoutRef,
  ReactNode,
  Ref,
  RefAttributes,
  RefObject,
} from 'react';

import type { MotionProps } from '@/lib/wideset/motion/Motion.types';
import type { Button } from '../button/Button';
import type { IconButton } from '../button/IconButton';
import type { textInputVariants } from './TextInput.variants';
import type { TextInputPrefix } from './TextInputPrefix';
import type { TextInputSuffix } from './TextInputSuffix';

export type TextInputContextValue = {
  size: VariantProps<typeof textInputVariants>['size'];
  variant: VariantProps<typeof textInputVariants>['variant'];
  inputRef: RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  /** Current input value — the root's `value` when controlled, its mirror otherwise. */
  currentValue: string;
  /**
   * The input's change handler: syncs the uncontrolled mirror, then calls the
   * root's `onChange`. The clear button reaches it through a real `input` event
   * on the element, never by calling it directly.
   */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  motion: boolean;
  /** Input props given to the root; `TextInput.Input` spreads them under its own. */
  inputProps?: TextInputInputProps;
  /** The ref given to the root; `TextInput.Input` attaches it beside `inputRef`. */
  forwardedInputRef?: Ref<HTMLInputElement>;
};

/**
 * `defaultValue` is omitted: without `value` the field keeps its own value,
 * starting empty. To start with a value, control it with `value` + `onChange`.
 */
export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'defaultValue'> &
  MotionProps &
  VariantProps<typeof textInputVariants> & {
    /** Layout/context overrides for the outer container. Visual styling goes through `variant`, `preset` and `size`. */
    className?: string;
    /**
     * Compound subcomponents (`TextInput.Prefix`, `TextInput.Input`, `TextInput.Suffix`, …). When omitted, a default `<input>` is rendered.
     * Input props and the `ref` given to the root reach `TextInput.Input` too; a prop set on `TextInput.Input` wins. Use one `TextInput.Input` per field.
     */
    children?: ReactNode;
  };

export type TextInputWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<TextInputProps> & RefAttributes<HTMLInputElement>
> & {
  Prefix: typeof TextInputPrefix;
  Suffix: typeof TextInputSuffix;
  Input: typeof import('./TextInputInput').TextInputInput;
  IconButton: typeof import('./TextInputIconButton').TextInputIconButton;
  Button: typeof import('./TextInputButton').TextInputButton;
  Icon: typeof import('./TextInputIcon').TextInputIcon;
  ClearButton: typeof import('./TextInputClearButton').TextInputClearButton;
};

/** The native input inside a composed field. */
export type TextInputInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'defaultValue'
> & {
  /** Additional CSS classes merged with the rendered element. */
  className?: string;
};

/** An icon action within the input. */
export type TextInputIconButtonProps = ComponentProps<typeof IconButton>;

/** A text action within the input. */
export type TextInputButtonProps = ComponentProps<typeof Button>;

/** An icon rendered within `TextInput`. */
export type TextInputIconProps = {
  /** The icon to render inside a `TextInput.Prefix` / `TextInput.Suffix`. Sized automatically from the input's `size`. */
  icon: RemixiconComponentType;
  /** Layout/context overrides for the icon. */
  className?: string;
};

/** The action clearing the input value. */
export type TextInputClearButtonProps = Omit<
  ComponentProps<typeof IconButton>,
  'icon' | 'children' | 'asChild' | 'preset' | 'variant' | 'size' | 'disabled'
> & {
  /** Icon rendered inside the clear button. Defaults to `RiCloseLine`. */
  icon?: RemixiconComponentType;
  /** Accessible label. Defaults to `'Clear'`. */
  'aria-label'?: string;
  /**
   * Runs before the field is cleared. Call `event.preventDefault()` to keep the value, for
   * example while a save is in progress.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Called after the value is cleared and the input's `onChange` has run with an empty value,
   * in both controlled and uncontrolled modes. Use it for side effects such as resetting
   * filters; validate in `onChange`, which also sees a value deleted by hand.
   */
  onClear?: () => void;
  /** Layout/context overrides for the button. */
  className?: string;
  /** Layout/context overrides for the icon. */
  iconClassName?: string;
};
