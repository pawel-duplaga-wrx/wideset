'use client';

import { useComposedRefs } from '@radix-ui/react-compose-refs';
import React from 'react';
import { cn } from '@/lib/wideset/utils';

import { useTextInputContext } from './TextInput.context';
import type { TextInputInputProps } from './TextInput.types';
import { textInputInputVariants } from './TextInput.variants';

export const TextInputInput = React.forwardRef<HTMLInputElement, TextInputInputProps>(
  ({ className, ...ownProps }, ref) => {
    const {
      inputRef,
      forwardedInputRef,
      inputProps,
      variant,
      disabled,
      size,
      currentValue,
      handleChange,
    } = useTextInputContext();
    const composedRef = useComposedRefs(inputRef, forwardedInputRef, ref);

    return (
      <input
        ref={composedRef}
        data-slot="text-input-input"
        type="text"
        // Before the spreads, so an explicit `aria-invalid` (even `false`) wins.
        aria-invalid={variant === 'danger' || undefined}
        data-disabled={disabled}
        disabled={disabled}
        // Root wiring first, then the root's input props, then this part's own:
        // an explicit `value`/`onChange` here still wins (a display-only trigger, say).
        value={currentValue}
        onChange={handleChange}
        {...inputProps}
        {...ownProps}
        className={cn(textInputInputVariants({ size }), className)}
      />
    );
  },
);

TextInputInput.displayName = 'TextInput.Input';
