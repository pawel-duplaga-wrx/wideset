import type { VariantProps } from 'class-variance-authority';
import type {
  ComponentType,
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import type { ButtonProps } from '../button/Button.types';
import type { systemAlertVariants } from './SystemAlert.variants';

export type SystemAlertStatus = NonNullable<VariantProps<typeof systemAlertVariants>['status']>;

export type SystemAlertEmphasis = NonNullable<VariantProps<typeof systemAlertVariants>['emphasis']>;

export type SystemAlertContextValue = {
  emphasis: SystemAlertEmphasis;
  status: SystemAlertStatus;
};

/** A dismissible page-level status message. */
export type SystemAlertProps = HTMLAttributes<HTMLDivElement> & {
  /** The semantic status of the alert. */
  status?: SystemAlertStatus;
  /** Controls whether the alert uses subtle or inverse styling. */
  emphasis?: SystemAlertEmphasis;
  /** Controls whether the alert is hidden. */
  dismissed?: boolean;
  /** Message content when not using SystemAlert.Message. */
  message?: ReactNode;
  /** Callback fired when the dismiss button is clicked. */
  onDismiss?: () => void;
  /** When true, renders the dismiss button. */
  dismissible?: boolean;
  /** Accessible label for the dismiss button. Defaults to `'Dismiss'`. */
  dismissAriaLabel?: string;
};

/** The message displayed inside the feedback surface. */
export type SystemAlertMessageProps = {
  /** Use SystemAlert.Message and SystemAlert.Action inside children. The message slot overrides the message prop. */
  children: ReactNode;
};

/** An action styled for `SystemAlert`. */
export type SystemAlertActionProps = ButtonProps;

export type SystemAlertWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<SystemAlertProps> & RefAttributes<HTMLDivElement>
> & {
  Message: ComponentType<SystemAlertMessageProps>;
  Action: ComponentType<SystemAlertActionProps>;
};
