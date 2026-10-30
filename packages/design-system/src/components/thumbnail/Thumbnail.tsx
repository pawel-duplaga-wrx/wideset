import {
  type RemixiconComponentType,
  RiBarChartFill,
  RiFilePdf2Fill,
  RiFileTextFill,
  RiImageFill,
  RiTableFill,
  RiVidiconFill,
} from '@remixicon/react';
import { forwardRef } from 'react';
import { cn } from 'src/lib/utils';

import type {
  ThumbnailFileType,
  ThumbnailProps,
  ThumbnailWithSubComponents,
} from './Thumbnail.types';
import {
  thumbnailIconVariants,
  thumbnailTextVariants,
  thumbnailVariants,
} from './Thumbnail.variants';
import { ThumbnailContext } from './ThumbnailContext';
import { ThumbnailIcon } from './ThumbnailIcon';
import { ThumbnailImage } from './ThumbnailImage';

/**
 * Figma draws Material glyphs here (`picture_as_pdf`, `table_chart`,
 * `description`, `videocam`, `image`); these are their Remix counterparts.
 */
const FILE_TYPE_ICONS: Record<ThumbnailFileType, RemixiconComponentType> = {
  pdf: RiFilePdf2Fill,
  spreadsheet: RiTableFill,
  document: RiFileTextFill,
  video: RiVidiconFill,
  picture: RiImageFill,
};

/**
 * A small square tile that stands for a thing — a document, an image, a brand.
 * The content mode follows the prop you pass: `icon` for a glyph, `src` for a
 * picture, `text` for a letter, or `type` for one of the fixed file kinds.
 */
export const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ className, size, children, type, icon: Icon, src, alt, text, ...props }, ref) => {
    const resolvedType = type ?? (src ? 'image' : text !== undefined ? 'text' : 'icon');

    const renderContent = () => {
      if (children) return children;

      switch (resolvedType) {
        case 'image':
          return <ThumbnailImage src={src as string} alt={alt ?? ''} />;
        case 'logo':
          return (
            <img
              src={src}
              alt={alt ?? ''}
              className={cn(thumbnailIconVariants({ size }), 'object-contain')}
            />
          );
        case 'text':
          return <span className={thumbnailTextVariants({ size })}>{text}</span>;
        case 'icon':
          return <ThumbnailIcon icon={Icon ?? RiBarChartFill} />;
        default:
          return <ThumbnailIcon icon={FILE_TYPE_ICONS[resolvedType]} />;
      }
    };

    return (
      <ThumbnailContext.Provider value={{ size }}>
        <div
          ref={ref}
          data-slot="thumbnail"
          className={cn(thumbnailVariants({ size, type: resolvedType }), className)}
          {...props}
        >
          {renderContent()}
        </div>
      </ThumbnailContext.Provider>
    );
  },
) as ThumbnailWithSubComponents;

Thumbnail.displayName = 'Thumbnail';
Thumbnail.Icon = ThumbnailIcon;
Thumbnail.Image = ThumbnailImage;
