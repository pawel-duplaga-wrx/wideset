'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import * as React from 'react';

import { useDefaultMotion } from '@/lib/wideset/motion/MotionProvider';
import { useSelectContext } from './Select.context';
import type {
  SelectOptionBodyElementProps,
  SelectOptionProps,
  SelectPrimitiveItemProps,
} from './Select.types';
import { SelectOptionBody } from './SelectOptionBody';
import { SelectOptionContent } from './SelectOptionContent';

export const SelectOption = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  SelectOptionProps
>((optionProps, ref) => {
  const {
    className,
    children,
    variant,
    disabled,
    shouldDisplayCheckmark = true,
    shouldUsePrimitive = true,
    value,
    textValue,
    defaultMotion,
    ...props
  } = optionProps;

  const { motion: selectMotion } = useSelectContext();
  const motion = useDefaultMotion(defaultMotion ?? selectMotion);

  const primitiveProps = props as SelectPrimitiveItemProps;
  const optionBodyProps = props as SelectOptionBodyElementProps;

  return shouldUsePrimitive ? (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-option"
      value={value as React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>['value']}
      textValue={textValue}
      disabled={disabled}
      {...primitiveProps}
      asChild
    >
      <SelectOptionBody
        variant={variant}
        disabled={disabled}
        shouldDisplayCheckmark={shouldDisplayCheckmark}
        className={className}
        defaultMotion={motion}
      >
        <SelectPrimitive.ItemText asChild>
          <SelectOptionContent>{children}</SelectOptionContent>
        </SelectPrimitive.ItemText>
      </SelectOptionBody>
    </SelectPrimitive.Item>
  ) : (
    <SelectOptionBody
      ref={ref as React.Ref<HTMLDivElement>}
      data-slot="select-option"
      variant={variant}
      disabled={disabled}
      shouldDisplayCheckmark={shouldDisplayCheckmark}
      className={className}
      defaultMotion={motion}
      {...optionBodyProps}
    >
      <SelectOptionContent>{children}</SelectOptionContent>
    </SelectOptionBody>
  );
});

SelectOption.displayName = 'Select.Option';
