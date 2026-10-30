import { RiSearchLine } from '@remixicon/react';
import React from 'react';

import { TextInput } from '../text-input/TextInput';
import type { SearchProps } from './Search.types';

/**
 * @deprecated Search will be removed in a future minor release. Compose the field from
 * `TextInput` instead (the TextInput "Search" example):
 *
 * ```tsx
 * <TextInput value={query} onChange={(event) => setQuery(event.target.value)}>
 *   <TextInput.Prefix inner>
 *     <TextInput.Icon icon={RiSearchLine} />
 *   </TextInput.Prefix>
 *   <TextInput.Input type="search" aria-label="Search invoices" />
 *   <TextInput.Suffix inner>
 *     <TextInput.ClearButton onClear={handleClear} />
 *   </TextInput.Suffix>
 * </TextInput>
 * ```
 *
 * - `showClearButton={false}`: leave out the `TextInput.Suffix` with the clear button.
 * - `clearAriaLabel`: `aria-label` on `TextInput.ClearButton` (defaults to `'Clear'`).
 * - The root's `data-slot` becomes `text-input` (was `search`); pass `data-slot="search"` to
 *   `TextInput` to keep `[data-slot=search]` selectors working.
 */
export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      preset = 'border',
      size,
      variant,
      className,
      showClearButton = true,
      value,
      onChange,
      onClear,
      clearAriaLabel,
      disabled,
      defaultMotion,
      ...rest
    },
    ref,
  ) => {
    // The other props and the ref go to the `<input>` through TextInput; the part marker
    // belongs to the root, and a composing component (Select.Search) passes its own.
    const { 'data-slot': dataSlot = 'search', ...inputProps } = rest as typeof rest & {
      'data-slot'?: string;
    };
    return (
      <TextInput
        data-slot={dataSlot}
        ref={ref}
        preset={preset}
        size={size}
        variant={variant}
        className={className}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultMotion={defaultMotion}
        {...inputProps}
      >
        <TextInput.Prefix inner>
          <TextInput.Icon icon={RiSearchLine} />
        </TextInput.Prefix>
        <TextInput.Input type="search" />
        {showClearButton && (
          <TextInput.Suffix inner>
            <TextInput.ClearButton onClear={onClear} aria-label={clearAriaLabel} />
          </TextInput.Suffix>
        )}
      </TextInput>
    );
  },
);

Search.displayName = 'Search';
