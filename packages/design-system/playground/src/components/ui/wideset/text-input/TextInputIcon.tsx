'use client';

import { cn } from '@/lib/wideset/utils';

import type { TextInputIconProps } from './TextInput.types';

// Figma binds the in-field icon to Size/9 (16px) at every control size — see
// Prefix `Type=Icon` and the Search prefix entity. It does not scale with `size`.
// `data-slot` is not a public prop: a composing component (`ComboBox.Icon`) passes its own.
export const TextInputIcon = ({
  icon: Icon,
  className,
  'data-slot': dataSlot = 'text-input-icon',
}: TextInputIconProps & { 'data-slot'?: string }) => (
  <Icon
    data-slot={dataSlot}
    aria-hidden="true"
    focusable="false"
    className={cn('size-ws-9', className)}
  />
);

TextInputIcon.displayName = 'TextInput.Icon';
