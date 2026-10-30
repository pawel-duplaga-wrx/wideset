import type * as Label from '@radix-ui/react-label';
import type * as RadixSwitch from '@radix-ui/react-switch';
import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import type { MotionProps } from '@/lib/wideset/motion/Motion.types';
import type { switchVariants } from './Switch.variants';
import type { SwitchLabel } from './SwitchLabel';

export type SwitchContextType = {
  disabled?: boolean;
  id?: string;
};

/** The text label associated with `Switch`. */
export type SwitchLabelProps = React.ComponentPropsWithoutRef<typeof Label.Root>;

/** A binary setting that takes effect immediately. */
export type SwitchProps = Omit<React.ComponentProps<typeof RadixSwitch.Root>, 'children'> &
  MotionProps &
  VariantProps<typeof switchVariants> & {
    /**
     * Position of label in accordance to the Switch
     *
     * @default 'right'
     */
    labelPosition?: 'left' | 'right';
    /**
     * Label of the switch
     */
    label?: string;
    /**
     * Label as children
     */
    children?: React.ReactNode;
  };

export type SwitchWithVariants = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<SwitchProps> &
    React.RefAttributes<React.ComponentRef<typeof RadixSwitch.Root>>
> & {
  Label: typeof SwitchLabel;
};
