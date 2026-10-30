import type { RemixiconComponentType } from '@remixicon/react';
import type { VariantProps } from 'class-variance-authority';
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ImgHTMLAttributes,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

import type { RemixiconProps } from '../../types/icon.types';
import type { thumbnailVariants } from './Thumbnail.variants';
import type { ThumbnailIcon } from './ThumbnailIcon';
import type { ThumbnailImage } from './ThumbnailImage';

export type ThumbnailSize = NonNullable<VariantProps<typeof thumbnailVariants>['size']>;

/**
 * Figma's `Type` axis. The first four take content from you; the file kinds
 * carry a fixed glyph and hue so a document list reads at a glance.
 */
export type ThumbnailType = NonNullable<VariantProps<typeof thumbnailVariants>['type']>;

/** The `Type` values that stand for a kind of file rather than for content you pass in. */
export type ThumbnailFileType = Extract<
  ThumbnailType,
  'pdf' | 'spreadsheet' | 'document' | 'video' | 'picture'
>;

export type ThumbnailContextType = {
  size?: ThumbnailSize;
};

export type ThumbnailCommonProps = {
  /** Figma's `Size` axis: 16 / 20 / 24 / 32 / 40px. */
  size?: ThumbnailSize;
};

type ThumbnailIconContent = {
  type?: 'icon';
  /** Glyph drawn on the purple tile. Defaults to a bar chart, as in Figma. */
  icon?: RemixiconComponentType;
  src?: never;
  alt?: never;
  text?: never;
};

type ThumbnailImageContent = {
  type?: 'image';
  /** Picture that fills the tile edge to edge. */
  src: string;
  /** Alternative text. Pass `""` when the picture is decorative. */
  alt: string;
  icon?: never;
  text?: never;
};

type ThumbnailLogoContent = {
  type: 'logo';
  /** Logo drawn at glyph size on a white tile with a subtle border. */
  src: string;
  /** Alternative text. Pass `""` when the logo is decorative. */
  alt: string;
  icon?: never;
  text?: never;
};

type ThumbnailTextContent = {
  type?: 'text';
  /** Short label — a letter or two — drawn on the purple tile. */
  text: string;
  icon?: never;
  src?: never;
  alt?: never;
};

type ThumbnailFileContent = {
  /** A kind of file. The glyph and hue are fixed per kind. */
  type: ThumbnailFileType;
  icon?: never;
  src?: never;
  alt?: never;
  text?: never;
};

export type ThumbnailContent =
  | ThumbnailIconContent
  | ThumbnailImageContent
  | ThumbnailLogoContent
  | ThumbnailTextContent
  | ThumbnailFileContent;

export type ThumbnailProps = HTMLAttributes<HTMLDivElement> &
  ThumbnailCommonProps &
  ThumbnailContent;

export type ThumbnailIconProps = RemixiconProps &
  ThumbnailCommonProps & {
    icon: RemixiconComponentType;
  };

export type ThumbnailImageProps = ImgHTMLAttributes<HTMLImageElement> &
  ThumbnailCommonProps & {
    src: string;
    alt: string;
  };

export type ThumbnailWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<ThumbnailProps> & RefAttributes<HTMLDivElement>
> & {
  Icon: typeof ThumbnailIcon;
  Image: typeof ThumbnailImage;
};
