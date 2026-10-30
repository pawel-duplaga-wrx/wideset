import { forwardRef } from 'react';
import { cn } from 'src/lib/utils';

import type { ThumbnailIconProps } from './Thumbnail.types';
import { thumbnailIconVariants } from './Thumbnail.variants';
import { useThumbnailContext } from './ThumbnailContext';

export const ThumbnailIcon = forwardRef<SVGSVGElement, ThumbnailIconProps>(
  ({ size, icon: Icon, className, ...props }, ref) => {
    const context = useThumbnailContext();

    return (
      <Icon
        ref={ref}
        data-slot="thumbnail-icon"
        aria-hidden="true"
        focusable="false"
        className={cn(thumbnailIconVariants({ size: size || context?.size || 'md' }), className)}
        {...props}
      />
    );
  },
);

ThumbnailIcon.displayName = 'Thumbnail.Icon';
