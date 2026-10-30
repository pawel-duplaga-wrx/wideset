'use client';

import type { VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/lib/wideset/utils';

import { useTextInputContext } from './TextInput.context';
import { textInputInfoVariants } from './TextInput.variants';

export type TextInputInfoProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof textInputInfoVariants> & {
    position: 'prefix' | 'suffix';
    /**
     * What this affix holds. Figma insets an affix by the kind of content it
     * carries, not only by `size` — text sits roomier than an icon, and an icon
     * button (which has padding of its own) tighter than both.
     *
     * Inferred from `children` when omitted, so the common cases need no prop.
     */
    content?: 'text' | 'icon' | 'iconButton';
  };

/**
 * Matched on `displayName` rather than on the component identity: `TextInput.types`
 * already imports Prefix/Suffix, so importing the subcomponents here would close an
 * import cycle back into this file.
 */
const CONTENT_BY_DISPLAY_NAME: Record<string, 'text' | 'icon' | 'iconButton'> = {
  'TextInput.IconButton': 'iconButton',
  'TextInput.ClearButton': 'iconButton',
  'TextInput.Icon': 'icon',
  'TextInput.Button': 'text',
};

const inferContent = (children: React.ReactNode): 'text' | 'icon' | 'iconButton' => {
  const nodes = React.Children.toArray(children);
  if (nodes.length === 0) return 'icon';

  const kinds = nodes.map((node) => {
    if (typeof node === 'string' || typeof node === 'number') return 'text';
    if (React.isValidElement(node)) {
      const name = (node.type as { displayName?: string })?.displayName;
      if (name && CONTENT_BY_DISPLAY_NAME[name]) return CONTENT_BY_DISPLAY_NAME[name];
    }
    return 'icon';
  });

  // An icon button dominates: it brings its own padding, so the affix tightens
  // around it even when it sits next to other content.
  if (kinds.includes('iconButton')) return 'iconButton';
  return kinds.every((k) => k === 'text') ? 'text' : 'icon';
};

export const TextInputInfo = ({
  className,
  children,
  inner,
  position,
  content,
  onClick,
  ...props
}: TextInputInfoProps) => {
  const { inputRef, size, disabled } = useTextInputContext();
  const resolvedContent = content ?? inferContent(children);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    inputRef.current?.focus();
  };

  return (
    <div
      {...props}
      role="none"
      onClick={handleClick}
      data-disabled={disabled}
      className={cn(
        textInputInfoVariants({ size, position, inner, content: resolvedContent }),
        className,
      )}
    >
      {children}
    </div>
  );
};

TextInputInfo.displayName = 'TextInput.Info';
