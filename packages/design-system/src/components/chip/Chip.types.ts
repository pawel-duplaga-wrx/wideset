import type { RemixiconComponentType } from '@remixicon/react';
import type { VariantProps } from 'class-variance-authority';
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { RemixiconProps } from '../../types/icon.types';
import type { chipVariants } from './Chip.variants';
import type { ChipIcon } from './ChipIcon';

export type ChipContextValue = {
  size: VariantProps<typeof chipVariants>['size'];
  variant: VariantProps<typeof chipVariants>['variant'];
  style: VariantProps<typeof chipVariants>['style'];
};

/** An interactive label for selection, filtering, or dismissal. */
export type ChipProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> &
  MotionProps &
  VariantProps<typeof chipVariants> & {
    /** Disables the chip interaction while preserving its layout and visual presence. */
    disabled?: boolean;
  };

export type ChipWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<ChipProps> & RefAttributes<HTMLDivElement>
> & {
  Icon: typeof ChipIcon;
};

/** An icon rendered within `Chip`. */
export type ChipIconProps = RemixiconProps & {
  /** Icon component rendered inside the chip and styled from the current chip context. */
  icon: RemixiconComponentType;
};
