import { forwardRef } from 'react';
import { cn } from 'src/lib/utils';

import type { ThumbnailImageProps } from './Thumbnail.types';

export const ThumbnailImage = forwardRef<HTMLImageElement, ThumbnailImageProps>(
  ({ src, alt, className, ...props }, ref) => (
    <img
      ref={ref}
      data-slot="thumbnail-image"
      src={src}
      alt={alt}
      className={cn('size-full object-cover', className)}
      {...props}
    />
  ),
);

ThumbnailImage.displayName = 'Thumbnail.Image';
