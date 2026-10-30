import React from 'react';
import { TextInput } from 'src/components/text-input/TextInput';
import { cn } from 'src/lib/utils';

import { useComboBoxContext } from './ComboBox.context';
import type {
  ComboBoxIconProps,
  ComboBoxPrefixProps,
  ComboBoxProps,
  ComboBoxWithSubComponents,
} from './ComboBox.types';
import { ComboBoxContent } from './ComboBoxContent';
import { ComboBoxItem } from './ComboBoxItem';
import { ComboBoxRoot } from './ComboBoxRoot';
import { ComboBoxTrigger } from './ComboBoxTrigger';

const ComboBoxBody = ({
  className,
  children,
  placeholder,
  size,
  preset,
  disabled,
  variant,
  ...props
}: Omit<
  ComboBoxProps,
  | 'options'
  | 'clearable'
  | 'disallowCustomValue'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onClear'
>) => {
  const { options, currentValue, filteredOptions } = useComboBoxContext();

  const selectedOption = options?.find((option) => option.value === currentValue);

  const triggerChildren =
    children ??
    (selectedOption?.prefix ? <TextInput.Prefix>{selectedOption.prefix}</TextInput.Prefix> : null);

  const hasPrefix = React.Children.toArray(triggerChildren).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === TextInput.Prefix || child.type === ComboBoxPrefix),
  );

  return (
    <>
      <ComboBoxTrigger
        className={cn('relative w-[16rem]', className)}
        size={size}
        variant={variant}
        preset={preset}
        disabled={disabled}
        hasPrefix={hasPrefix}
        placeholder={placeholder}
        {...props}
      >
        {triggerChildren}
      </ComboBoxTrigger>
      {filteredOptions.length > 0 && (
        <ComboBoxContent>
          {filteredOptions.map((option) => (
            <ComboBoxItem key={option.value} value={option.value} />
          ))}
        </ComboBoxContent>
      )}
    </>
  );
};

const ComboBox = (({
  options,
  placeholder,
  className,
  children,
  clearable,
  disallowCustomValue,
  value,
  defaultValue,
  onChange,
  onClear,
  size,
  preset,
  disabled,
  variant = 'primary',
  defaultMotion,
  ...props
}: ComboBoxProps) => {
  const isComposable = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === ComboBoxTrigger || child.type === ComboBoxContent),
  );

  return (
    <ComboBoxRoot
      options={options}
      clearable={clearable}
      disallowCustomValue={disallowCustomValue}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onClear={onClear}
      disabled={disabled}
      defaultMotion={defaultMotion}
    >
      {isComposable ? (
        children
      ) : (
        <ComboBoxBody
          className={className}
          placeholder={placeholder}
          size={size}
          preset={preset}
          disabled={disabled}
          variant={variant}
          {...props}
        >
          {children}
        </ComboBoxBody>
      )}
    </ComboBoxRoot>
  );
}) as ComboBoxWithSubComponents;

ComboBox.displayName = 'ComboBox';
ComboBox.Trigger = ComboBoxTrigger;
ComboBox.Content = ComboBoxContent;
ComboBox.Item = ComboBoxItem;
export const ComboBoxPrefix = (props: ComboBoxPrefixProps) => (
  <TextInput.Prefix data-slot="combo-box-prefix" {...props} />
);
ComboBoxPrefix.displayName = 'ComboBox.Prefix';
ComboBox.Prefix = ComboBoxPrefix;
export const ComboBoxIcon = (props: ComboBoxIconProps) => (
  <TextInput.Icon data-slot="combo-box-icon" {...props} />
);
ComboBoxIcon.displayName = 'ComboBox.Icon';
ComboBox.Icon = ComboBoxIcon;

export { ComboBox };
