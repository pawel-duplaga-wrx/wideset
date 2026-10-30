import type * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from 'react';

import type { MotionProps } from '../../motion/Motion.types';

/** Visual variant — `default` for light surfaces, `inverse` for dark or colored surfaces. */
export type TooltipVariant = 'default' | 'inverse';

/** Size of the tooltip text. `md` uses body typography, `sm` uses caption typography. */
export type TooltipSize = 'sm' | 'md';

/** Supplementary information anchored to a trigger. */
export type TooltipProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> &
  MotionProps & {
    /** Content rendered inside the component. */
    children?: ReactNode;
    /** Visual variant — `default` suits light surfaces; `inverse` suits dark or colored surfaces. */
    variant?: TooltipVariant;
    /** Size of the tooltip text. `md` uses body typography, `sm` uses caption typography. */
    size?: TooltipSize;
    /** Shows a directional arrow pointing at the trigger. */
    arrow?: boolean;
    /** Milliseconds before the tooltip appears after hover. */
    delayDuration?: number;
  };

/** Props for `Tooltip.Content` — the floating surface that wraps label and description. */
export type TooltipContentProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
  MotionProps & {
    /** DOM node to portal the content into. Defaults to `document.body`. */
    portalContainer?: ComponentPropsWithoutRef<typeof TooltipPrimitive.Portal>['container'];
  };

/** Props for `Tooltip.Label` — bold title text rendered inside the tooltip. */
export type TooltipLabelProps = HTMLAttributes<HTMLSpanElement>;

/** Props for `Tooltip.Description` — supporting text rendered below the label. */
export type TooltipDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/** Props for the internal tooltip arrow element. */
export type TooltipArrowProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>;

/** Props for `Tooltip.Trigger` — the element the tooltip is anchored to. */
export type TooltipTriggerProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;

/** Props for `Tooltip.Portal`. */
export type TooltipPortalProps = ComponentPropsWithoutRef<typeof TooltipPrimitive.Portal>;
