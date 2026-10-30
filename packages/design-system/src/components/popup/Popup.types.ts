import type * as PopoverPrimitive from '@radix-ui/react-popover';
import type { ComponentProps, ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import type { MotionProps } from '../../motion/Motion.types';

export type PopupProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

/** The portal destination for floating content. */
export type PopupPortalProps = ComponentProps<typeof PopoverPrimitive.Portal>;

/** The control that opens or toggles the associated content. */
export type PopupTriggerProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

/** A control that closes the associated dialog. */
export type PopupCloseProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>;

/** The floating surface or stack containing feedback content. */
export type PopupContainerProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
  MotionProps & {
    /** Prevents closing the popup by clicking outside or pressing Escape. */
    persistent?: boolean;
    /** DOM element to portal the popup content into. Defaults to `document.body`. */
    portalContainer?: PopupPortalProps['container'];
  };

/** The header area for a title and supporting content. */
export type PopupHeaderProps = HTMLAttributes<HTMLDivElement>;

/** The primary title text. */
export type PopupTitleProps = HTMLAttributes<HTMLHeadingElement>;

/** Supporting descriptive text. */
export type PopupDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/** The content surface rendered within `Popup`. */
export type PopupContentProps = HTMLAttributes<HTMLDivElement> & {
  /** Additional className applied to the inner scroll content wrapper. */
  contentClassName?: string;
};

/** The action area beneath the main content. */
export type PopupFooterProps = HTMLAttributes<HTMLDivElement>;
