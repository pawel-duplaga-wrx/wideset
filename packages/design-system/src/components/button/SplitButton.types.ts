import type { VariantProps } from 'class-variance-authority';
import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  MouseEventHandler,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { ButtonIconProps, ButtonTruncatedTextProps } from './Button.types';
import type { ButtonIcon } from './ButtonIcon';
import type { ButtonTruncatedText } from './ButtonTruncatedText';
import type { splitButtonMainVariants } from './SplitButton.variants';

/** `SplitButton.Icon` is `Button.Icon`; same props. */
export type SplitButtonIconProps = ButtonIconProps;

/** `SplitButton.TruncatedText` is `Button.TruncatedText`; same props. */
export type SplitButtonTruncatedTextProps = ButtonTruncatedTextProps;

/** A primary action with a separate dropdown trigger. */
export type SplitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps &
  VariantProps<typeof splitButtonMainVariants> & {
    /** Button label or custom content rendered in the main action area. */
    children?: ReactNode;
    /** Additional CSS classes merged with the outer wrapper element. */
    className?: string;
    /** Disables the main (left) button only. */
    disabled?: boolean;
    /** Icon rendered in the trailing dropdown trigger segment. */
    icon: ButtonIconProps['icon'];
    /** Items or content rendered inside the dropdown menu. Use `DropdownMenu.Item`, `DropdownMenu.Label`, and `DropdownMenu.Separator` to compose the menu. */
    menuContent?: ReactNode;
    /** Controlled open state for the dropdown. */
    open?: boolean;
    /** Uncontrolled default open state for the dropdown. */
    defaultOpen?: boolean;
    /** Called when the dropdown open state changes. */
    onOpenChange?: (open: boolean) => void;
    /** Preferred side of the trigger to render the dropdown against. */
    menuSide?: 'top' | 'right' | 'bottom' | 'left';
    /** Alignment of the dropdown content relative to the trigger. */
    menuAlign?: 'start' | 'center' | 'end';
    /** Disables the icon/dropdown trigger button independently of the main button. */
    iconDisabled?: boolean;
    /** Accessible label for the icon button. */
    iconAriaLabel?: string;
    /** Called when the user activates the main button. */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** Native button type used for the main button. */
    type?: 'button' | 'submit' | 'reset';
  };

export type SplitButtonWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<SplitButtonProps> & RefAttributes<HTMLButtonElement>
> & {
  Icon: typeof ButtonIcon;
  TruncatedText: typeof ButtonTruncatedText;
};
