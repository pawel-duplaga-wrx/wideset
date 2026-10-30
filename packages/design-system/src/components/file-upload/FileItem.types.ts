import type { VariantProps } from 'class-variance-authority';
import type {
  ComponentProps,
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { ThumbnailProps } from '../thumbnail/Thumbnail.types';
import type { fileItemVariants } from './FileItem.variants';
import type { FileItemDescription } from './FileItemDescription';
import type { FileItemLoading } from './FileItemLoading';
import type { FileItemThumbnail } from './FileItemThumbnail';
import type { FileItemTitle } from './FileItemTitle';

/** A file row with metadata and upload feedback. */
export type FileItemProps = ComponentProps<'div'> &
  Pick<VariantProps<typeof fileItemVariants>, 'variant'> &
  MotionProps & {
    /**
     * The upload is in flight: a spinner replaces the remove button and the
     * row takes Figma's wider `Uploading` gap. Same as placing `FileItem.Loading`.
     */
    isLoading?: boolean;
    /** The upload failed: danger tint (contained) and a warning icon. Figma's `Type=Error`. */
    hasError?: boolean;
    /** Error headline under the row, in the negative colour. Implies `hasError`. */
    error?: ReactNode;
    /** Shows the remove button (hidden while loading). */
    onRemove?: () => void;
    /** Accessible label for the remove button. Defaults to `Remove <title>`. */
    removeLabel?: string;
  };

/** A file preview inferred from its name, MIME type, or explicit content. */
export type FileItemThumbnailProps = ThumbnailProps & {
  /**
   * File name. When no `type`, `src`, `text` or `icon` is given, the file
   * kind is read off its extension — `report.pdf` shows the PDF tile.
   */
  name?: string;
  /** MIME type of the file; takes precedence over the extension when inferring the kind. */
  mimeType?: string;
};

/** The primary title text. */
export type FileItemTitleProps = HTMLAttributes<HTMLSpanElement>;

/** Several children are separated by a thin vertical rule — `1.2 MB | 2 seconds left`. */
export type FileItemDescriptionProps = HTMLAttributes<HTMLSpanElement>;

/** An upload-in-progress indicator. */
export type FileItemLoadingProps = HTMLAttributes<HTMLSpanElement>;

export type FileItemWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<FileItemProps> & RefAttributes<HTMLDivElement>
> & {
  Thumbnail: typeof FileItemThumbnail;
  Title: typeof FileItemTitle;
  Description: typeof FileItemDescription;
  Loading: typeof FileItemLoading;
};
