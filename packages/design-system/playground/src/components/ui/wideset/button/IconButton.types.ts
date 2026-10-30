import type { VariantProps } from 'class-variance-authority';
import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  MouseEventHandler,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import type { MotionProps } from '@/lib/wideset/motion/Motion.types';
import type { ButtonIconProps } from './Button.types';
import type { ButtonIcon } from './ButtonIcon';
import type { iconButtonVariants } from './IconButton.variants';

/** `IconButton.Icon` is `Button.Icon`; same props. */
export type IconButtonIconProps = ButtonIconProps;

/** An icon-only action button; provide an accessible name. */
export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps &
  VariantProps<typeof iconButtonVariants> & {
    /** Whether to render the icon button styling onto its child element via Radix Slot. */
    asChild?: boolean;
    /** Optional child element used when `asChild` is enabled. */
    children?: ReactNode;
    /** Additional CSS classes merged with the icon button root. */
    className?: string;
    /** Disables the icon button visually and functionally. */
    disabled?: boolean;
    /** Icon rendered as the main visible content of the button. */
    icon: ButtonIconProps['icon'];
    /** Additional CSS classes merged with the rendered icon. */
    iconClassName?: string;
    /** Called when the user activates the icon button. */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /** Native button type used for form behavior. */
    type?: 'button' | 'submit' | 'reset';
  };

export type IconButtonWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<IconButtonProps> & RefAttributes<HTMLButtonElement>
> & {
  Icon: typeof ButtonIcon;
};
