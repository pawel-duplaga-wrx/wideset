import type * as SidepanelPrimitive from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { sidepanelPanelVariants } from './Sidepanel.variants';

export type SidepanelProps = SidepanelPrimitive.DialogProps;

/** Props for the Sidepanel panel surface. Controls which edge it slides in from and its size. */
export type SidepanelPanelProps = ComponentPropsWithoutRef<typeof SidepanelPrimitive.Content> &
  VariantProps<typeof sidepanelPanelVariants> &
  MotionProps;

/** The backdrop behind the dialog surface. */
export type SidepanelOverlayProps = ComponentPropsWithoutRef<typeof SidepanelPrimitive.Overlay> &
  MotionProps;

/** Props for the Sidepanel scrollable content area. */
export type SidepanelContentProps = React.HTMLAttributes<HTMLDivElement> & {
  /** Additional className applied to the ScrollArea wrapper (outer element). */
  wrapperClassName?: string;
};

/** Props for the Sidepanel header. */
export type SidepanelHeaderProps = HTMLAttributes<HTMLDivElement> & {
  /** Draws the divider separating the header from the content. Defaults to `true`. */
  divider?: boolean;
};

/** Props for the Sidepanel footer. */
export type SidepanelFooterProps = HTMLAttributes<HTMLDivElement> & {
  /** Draws the divider separating the footer from the content. Defaults to `true`. */
  divider?: boolean;
};

/** Props for `Sidepanel.Trigger` — the Radix Dialog trigger. */
export type SidepanelTriggerProps = ComponentPropsWithoutRef<typeof SidepanelPrimitive.Trigger>;

/** Props for `Sidepanel.Close` — the Radix Dialog close control. */
export type SidepanelCloseProps = ComponentPropsWithoutRef<typeof SidepanelPrimitive.Close>;

/** Props for `Sidepanel.Title`. */
export type SidepanelTitleProps = ComponentPropsWithoutRef<typeof SidepanelPrimitive.Title>;

/** Props for `Sidepanel.Description`. */
export type SidepanelDescriptionProps = ComponentPropsWithoutRef<
  typeof SidepanelPrimitive.Description
>;

/** Props for `Sidepanel.Actions` — the top-right action slot. */
export type SidepanelActionsProps = HTMLAttributes<HTMLDivElement>;
