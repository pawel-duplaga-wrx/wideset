import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { VariantProps } from 'class-variance-authority';
import type { LabelHTMLAttributes } from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { radioVariants } from './RadioButton.variants';
import type { RadioButtonDescription } from './RadioButtonDescription';
import type { RadioButtonGroup } from './RadioButtonGroup';
import type { RadioButtonLabel } from './RadioButtonLabel';

export type RadioButtonContextType = {
  disabled?: boolean;
  id?: string;
};

type RadioButtonItemPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
>;

type RadioGroupPrimitiveProps = React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;

type RadioButtonPropsBase = Omit<
  RadioButtonItemPrimitiveProps,
  'children' | 'className' | 'disabled' | 'id' | 'required' | 'value'
> &
  MotionProps &
  VariantProps<typeof radioVariants> & {
    /** Additional CSS classes merged with the radio root element. */
    className?: RadioButtonItemPrimitiveProps['className'];
    /** Disables the radio visually and functionally. */
    disabled?: RadioButtonItemPrimitiveProps['disabled'];
    /** Stable id of the radio input. When omitted, one is generated automatically. */
    id?: RadioButtonItemPrimitiveProps['id'];
    /** Marks the radio as required in a form context. */
    required?: RadioButtonItemPrimitiveProps['required'];
    /** Unique value of the radio within the owning `RadioButton.Group`. */
    value: RadioButtonItemPrimitiveProps['value'];
  };

type RadioButtonPropsWithLabel = RadioButtonPropsBase & {
  /** Shorthand label rendered next to the radio. Mutually exclusive with `children`. */
  label: string;
  /** Supplementary text shown below the shorthand label. Requires `label`. */
  description?: string;
  children?: never;
};

type RadioButtonPropsWithChildren = RadioButtonPropsBase & {
  label?: never;
  description?: never;
  /** Composed label content such as `RadioButton.Label` and `RadioButton.Description`. */
  children?: React.ReactNode;
};

type RadioButtonPropsWithoutLabel = RadioButtonPropsBase & {
  label?: never;
  description?: never;
  children?: never;
};

/** One option in a mutually exclusive radio group. */
export type RadioButtonProps =
  RadioButtonPropsWithLabel | RadioButtonPropsWithChildren | RadioButtonPropsWithoutLabel;

export type RadioButtonWithSubComponents = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<RadioButtonProps> &
    React.RefAttributes<React.ComponentRef<typeof RadioGroupPrimitive.Item>>
> & {
  Group: typeof RadioButtonGroup;
  Label: typeof RadioButtonLabel;
  Description: typeof RadioButtonDescription;
};

/** A group managing one selected radio value. */
export type RadioButtonGroupProps = Omit<
  RadioGroupPrimitiveProps,
  | 'children'
  | 'className'
  | 'defaultValue'
  | 'disabled'
  | 'name'
  | 'onValueChange'
  | 'orientation'
  | 'required'
  | 'value'
> & {
  /** RadioButton items rendered inside the group. */
  children?: RadioGroupPrimitiveProps['children'];
  /** Additional CSS classes merged with the group root element. */
  className?: RadioGroupPrimitiveProps['className'];
  /** Initial selected value for uncontrolled usage. Ignored when `value` is provided. */
  defaultValue?: RadioGroupPrimitiveProps['defaultValue'];
  /** Disables every radio in the group. */
  disabled?: RadioGroupPrimitiveProps['disabled'];
  /** Form field name shared by all radios in the group. */
  name?: RadioGroupPrimitiveProps['name'];
  /** Fired when the selected value changes. */
  onValueChange?: RadioGroupPrimitiveProps['onValueChange'];
  /** Layout direction of the radios within the group. */
  orientation?: RadioGroupPrimitiveProps['orientation'];
  /** Marks the group as required in a form context. */
  required?: RadioGroupPrimitiveProps['required'];
  /** Controlled selected radio value. */
  value?: RadioGroupPrimitiveProps['value'];
};

/** The text label associated with `RadioButton`. */
export type RadioButtonLabelProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'> & {
  /** Explicit id of the radio controlled by this label. Falls back to the nearest `RadioButton` id. */
  htmlFor?: string;
};
