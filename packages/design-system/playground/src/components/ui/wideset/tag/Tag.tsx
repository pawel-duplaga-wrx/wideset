'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/wideset/utils';

import { TagContext } from './Tag.context';
import type { TagProps, TagWithSubComponents } from './Tag.types';
import { tagVariants } from './Tag.variants';
import { TagIcon } from './TagIcon';

const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      className,
      size = 'md',
      color = 'brand',
      preset = 'filled',
      shape = 'square',
      children,
      truncate,
      iconOnly = false,
      ...props
    },
    ref,
  ) => {
    return (
      <TagContext.Provider value={{ size, color }}>
        <div
          className={cn(
            tagVariants({
              size,
              color,
              preset,
              shape,
              truncate,
              iconOnly,
            }),
            className,
          )}
          ref={ref}
          data-slot="tag"
          {...props}
        >
          {truncate ? <span className="min-w-0 flex-1 truncate">{children}</span> : children}
        </div>
      </TagContext.Provider>
    );
  },
) as TagWithSubComponents;

Tag.displayName = 'Tag';
Tag.Icon = TagIcon;

export { Tag };
