import { forwardRef } from 'react';

import { Thumbnail } from '../thumbnail/Thumbnail';
import { getThumbnailType } from '../thumbnail/Thumbnail.logic';
import type { ThumbnailProps } from '../thumbnail/Thumbnail.types';
import type { FileItemThumbnailProps } from './FileItem.types';

/**
 * The tile at the start of the row — a `Thumbnail` at Figma's 32px (`lg`).
 * Hand it the file `name` and the kind is read off the extension; or pass any
 * `Thumbnail` content prop (`src`, `type`, `icon`, `text`) to pin it.
 */
export const FileItemThumbnail = forwardRef<HTMLDivElement, FileItemThumbnailProps>(
  ({ name, mimeType, size = 'lg', ...props }, ref) => {
    const { type, src, text, icon } = props;
    const inferred =
      !type && !src && text === undefined && !icon && name
        ? getThumbnailType(name, mimeType)
        : undefined;
    const thumbnailProps = (inferred ? { ...props, type: inferred } : props) as ThumbnailProps;

    return <Thumbnail ref={ref} data-slot="file-item-thumbnail" size={size} {...thumbnailProps} />;
  },
);

FileItemThumbnail.displayName = 'FileItem.Thumbnail';
