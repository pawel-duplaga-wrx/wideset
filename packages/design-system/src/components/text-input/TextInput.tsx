import React, { useState } from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { TextInputContext } from './TextInput.context';
import type { TextInputProps, TextInputWithSubComponents } from './TextInput.types';
import { textInputMotionVariants, textInputVariants } from './TextInput.variants';
import { TextInputButton } from './TextInputButton';
import { TextInputClearButton } from './TextInputClearButton';
import { TextInputIcon } from './TextInputIcon';
import { TextInputIconButton } from './TextInputIconButton';
import { TextInputInput } from './TextInputInput';
import { TextInputPrefix } from './TextInputPrefix';
import { TextInputSuffix } from './TextInputSuffix';

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      size = 'md',
      variant,
      disabled = false,
      children,
      className,
      preset,
      value,
      onChange,
      defaultMotion,
      ...rest
    },
    ref,
  ) => {
    // The other props and the ref go to the `<input>`, composed or not; the part marker
    // belongs to the root, and a composing component (Search, ComboBox) passes its own.
    const { 'data-slot': dataSlot = 'text-input', ...props } = rest as typeof rest & {
      'data-slot'?: string;
    };
    const inputRef = React.useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;
    const motion = useDefaultMotion(defaultMotion);

    const [internalValue, setInternalValue] = useState('');
    const currentValue = isControlled ? String(value ?? '') : internalValue;

    /** The single write path — keeps the mirror in sync, then reports outward. */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(event.target.value);
      onChange?.(event);
    };

    return (
      <TextInputContext.Provider
        value={{
          size,
          variant,
          disabled,
          inputRef,
          currentValue,
          handleChange,
          motion,
          inputProps: props,
          forwardedInputRef: ref,
        }}
      >
        <div
          data-slot={dataSlot}
          className={cn(
            textInputVariants({ size, variant, preset }),
            textInputMotionVariants({ enabled: motion }),
            className,
          )}
          data-disabled={disabled}
          data-danger={variant === 'danger'}
        >
          {children || <TextInputInput />}
        </div>
      </TextInputContext.Provider>
    );
  },
) as TextInputWithSubComponents;

TextInput.displayName = 'TextInput';

TextInput.Prefix = TextInputPrefix;
TextInput.Suffix = TextInputSuffix;
TextInput.Input = TextInputInput;
TextInput.IconButton = TextInputIconButton;
TextInput.Button = TextInputButton;
TextInput.Icon = TextInputIcon;
TextInput.ClearButton = TextInputClearButton;

export { TextInput };
