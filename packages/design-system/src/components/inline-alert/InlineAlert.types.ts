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
import type { inlineAlertVariants } from './InlineAlert.variants';

/** Semantic tone of the alert visuals and iconography. */
export type InlineAlertStatus = NonNullable<VariantProps<typeof inlineAlertVariants>['status']>;

/** Layout direction of the alert content and action area. */
export type InlineAlertOrientation = NonNullable<
  VariantProps<typeof inlineAlertVariants>['orientation']
>;

/** Persistent feedback within a page section. */
export type InlineAlertProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className' | 'title'
> &
  VariantProps<typeof inlineAlertVariants> & {
    /** Additional CSS classes merged with the alert root element. */
    className?: string;
    /**
     * Alert content, typically composed with `InlineAlert.Title`, `InlineAlert.Message`, and
     * `InlineAlert.Action`. Slot content overrides the `title` and `message` props.
     */
    children?: ReactNode;
    /** Optional identifier used to reset uncontrolled dismissed state when the alert instance changes. */
    alertId?: string;
    /** Optional identifier used to reset uncontrolled dismissed state when the message content changes. */
    messageId?: string;
    /** Controlled visibility state. When `true`, the alert is hidden. */
    dismissed?: boolean;
    /** Optional short title rendered above or before the main message. */
    title?: string;
    /** Main alert message when not using `InlineAlert.Message`. */
    message?: ReactNode;
    /** Called when the user presses the dismiss button. */
    onDismiss?: () => void;
    /** When `true`, the dismiss button is not rendered. */
    persistent?: boolean;
    /** Accessible label for the dismiss button. Defaults to `'Dismiss'`. */
    dismissAriaLabel?: string;
  };

/** The primary title text. */
export type InlineAlertTitleProps = {
  /** Short heading content rendered above or before the alert message. */
  children: ReactNode;
};

/** The message displayed inside the feedback surface. */
export type InlineAlertMessageProps = {
  /** Main inline message content. */
  children: ReactNode;
};

/**
 * Props forwarded to `InlineAlert.Action`.
 * Inherits the full `Button` API and defaults to `preset="border"`, `variant="secondary"`,
 * and `size="sm"` when those props are not provided.
 */
export interface InlineAlertActionProps extends ButtonProps {}

export type InlineAlertWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<InlineAlertProps> & RefAttributes<HTMLDivElement>
> & {
  Title: ComponentType<InlineAlertTitleProps>;
  Message: ComponentType<InlineAlertMessageProps>;
  Action: ComponentType<InlineAlertActionProps>;
  Outlet: ForwardRefExoticComponent<
    PropsWithoutRef<InlineAlertOutletProps> & RefAttributes<InlineAlertOutletHandle>
  >;
};

export type InlineAlertShowConfig = {
  /** Semantic alert tone used for the rendered inline alert. */
  status?: InlineAlertStatus;
  /** Layout direction of the rendered inline alert. */
  orientation?: InlineAlertOrientation;
  /** Optional short title rendered above or before the alert message. */
  title?: string;
  /** Main inline alert message content. */
  message: ReactNode;
  /** Optional action content rendered inside the alert. */
  action?: ReactNode | ReactNode[];
};

export type InlineAlertItem = InlineAlertShowConfig & {
  /** Stable identifier for a rendered inline alert instance. */
  id: string;
};

/** Container for alerts shown through its ref (`show`, `dismiss`, `dismissAll`). */
export type InlineAlertOutletProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'className'
> & {
  /** Additional CSS classes merged with the outlet container. */
  className?: string;
  /** Additional CSS classes merged with each rendered inline alert root. */
  inlineAlertClassName?: string;
  /** Additional CSS classes merged with each rendered inline alert message. */
  messageClassName?: string;
};

export type InlineAlertOutletHandle = {
  /** Adds a new inline alert and returns its generated id. */
  show: (config: InlineAlertShowConfig) => string;
  /** Dismisses a rendered inline alert by id. */
  dismiss: (id: string) => void;
  /** Dismisses all rendered inline alerts. */
  dismissAll: () => void;
};
