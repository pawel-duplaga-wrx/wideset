import type { VariantProps } from 'class-variance-authority';
import type {
  AnchorHTMLAttributes,
  ForwardRefExoticComponent,
  MouseEventHandler,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { ButtonTruncatedTextProps } from './Button.types';
import type { ButtonTruncatedText } from './ButtonTruncatedText';
import type { linkButtonVariants } from './LinkButton.variants';

/** `LinkButton.TruncatedText` is `Button.TruncatedText`; same props. */
export type LinkButtonTruncatedTextProps = ButtonTruncatedTextProps;

/** A navigation link styled as a button. */
export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  MotionProps &
  VariantProps<typeof linkButtonVariants> & {
    /** Whether to render the link button styling onto its child element via Radix Slot. */
    asChild?: boolean;
    /** Link label or custom content rendered inside the root. */
    children?: ReactNode;
    /** Additional CSS classes merged with the link button root. */
    className?: string;
    /** Disabled state that prevents interaction and marks the control as aria-disabled. */
    disabled?: boolean;
    /** Destination URL used when rendering a native anchor. */
    href?: string;
    /** Called when the user activates the link button. */
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    /** Renders the label with an underline. Off by default. */
    underlined?: boolean;
  };

export type LinkButtonWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<LinkButtonProps> & RefAttributes<HTMLAnchorElement>
> & {
  TruncatedText: typeof ButtonTruncatedText;
};
