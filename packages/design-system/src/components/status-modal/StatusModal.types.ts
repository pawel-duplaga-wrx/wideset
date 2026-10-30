import type * as ModalPrimitive from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { statusModalContainerVariants } from './StatusModal.variants';

export type StatusModalStatus = NonNullable<
  VariantProps<typeof statusModalContainerVariants>['status']
>;

export type StatusModalOrientation = NonNullable<
  VariantProps<typeof statusModalContainerVariants>['orientation']
>;

/** The content surface rendered within `StatusModal`. */
export type StatusModalContentProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Content> &
  MotionProps & {
    /** Status that controls the icon style and color. */
    status?: StatusModalStatus;
    /** Layout orientation for title and content alignment. */
    orientation?: StatusModalOrientation;
    /** Shows the close button in the top right corner. */
    showCloseButton?: boolean;
    /** Prevents dismissal by outside interaction or Escape. Defaults to `false`. */
    persistent?: boolean;
    /** Moves focus into the dialog when it opens. Defaults to `true`. */
    autoFocusOnOpen?: boolean;
    /** Accessible label for the close button. Defaults to `'Close status modal'`. */
    closeAriaLabel?: string;
  };

/** Props for `StatusModal.Overlay` — the scrim behind the content. */
export type StatusModalOverlayProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay> &
  MotionProps;

/** The primary title text. */
export type StatusModalTitleProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Title> & {
  /** Status that controls the icon style and color. */
  status?: StatusModalStatus;
  /** Layout orientation for title and content alignment. */
  orientation?: StatusModalOrientation;
};

/** The main content area. */
export type StatusModalBodyProps = ComponentPropsWithoutRef<'div'> & {
  /** Layout orientation for title and content alignment. */
  orientation?: StatusModalOrientation;
};

/** The action area beneath the main content. */
export type StatusModalFooterProps = HTMLAttributes<HTMLDivElement> & {
  /** Layout orientation for title and content alignment. */
  orientation?: StatusModalOrientation;
};

/** A dialog communicating a status through its icon and layout. */
export type StatusModalProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Root> & {
  /** Status that controls the icon style and color. */
  status?: StatusModalStatus;
  /** Layout orientation for title and content alignment. */
  orientation?: StatusModalOrientation;
  /** Shows the close button in the top right corner. */
  showCloseButton?: boolean;
};

/** Props for `StatusModal.Trigger` — the Radix Dialog trigger. */
export type StatusModalTriggerProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Trigger>;

/** Props for `StatusModal.Close` — the Radix Dialog close control. */
export type StatusModalCloseProps = ComponentPropsWithoutRef<typeof ModalPrimitive.Close>;
