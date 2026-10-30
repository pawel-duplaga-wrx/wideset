import { RiDeleteBinLine, RiErrorWarningFill } from '@remixicon/react';
import { Children, forwardRef, isValidElement, type ReactNode } from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { IconButton } from '../button/IconButton';
import type { FileItemProps, FileItemWithSubComponents } from './FileItem.types';
import { fileItemContentVariants, fileItemVariants } from './FileItem.variants';
import { FileItemDescription } from './FileItemDescription';
import { FileItemLoading } from './FileItemLoading';
import { FileItemThumbnail } from './FileItemThumbnail';
import { FileItemTitle } from './FileItemTitle';

type Slots = {
  thumbnail: ReactNode[];
  info: ReactNode[];
  loading: ReactNode[];
  /** Anything else — lands under the row, in the message area. */
  rest: ReactNode[];
  /** Plain-text title, for the remove button's default label. */
  titleText?: string;
};

/**
 * Sorts children into Figma's slots by which part they are. Wrapping a part in
 * your own component hides it from this — pass the parts directly.
 */
const sortChildren = (children: ReactNode): Slots => {
  const slots: Slots = { thumbnail: [], info: [], loading: [], rest: [] };

  Children.toArray(children).forEach((child) => {
    if (isValidElement(child)) {
      if (child.type === FileItemThumbnail) return slots.thumbnail.push(child);
      if (child.type === FileItemTitle) {
        const text = (child.props as { children?: ReactNode }).children;
        if (typeof text === 'string') slots.titleText = text;
        return slots.info.push(child);
      }
      if (child.type === FileItemDescription) return slots.info.push(child);
      if (child.type === FileItemLoading) return slots.loading.push(child);
    }
    slots.rest.push(child);
  });

  return slots;
};

/**
 * One file: thumbnail, title, a secondary line, and the trailing control — a
 * spinner while loading, the remove `IconButton` once done, the warning icon
 * on error.
 */
const FileItem = forwardRef<HTMLDivElement, FileItemProps>(
  (
    {
      variant,
      isLoading = false,
      hasError = false,
      error,
      onRemove,
      removeLabel,
      defaultMotion,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const motion = useDefaultMotion(defaultMotion);
    const slots = sortChildren(children);
    const isError = hasError || !!error;
    // Error wins: a failed upload is not in flight, whatever `isLoading` says.
    const loading = !isError && (isLoading || slots.loading.length > 0);
    const state = isError ? 'error' : loading ? 'uploading' : 'success';
    const showRemove = !loading && !!onRemove;
    const showMessage = !!error || slots.rest.length > 0;

    return (
      <div
        ref={ref}
        data-slot="file-item"
        className={cn(fileItemVariants({ variant, state }), className)}
        {...props}
      >
        <div className={fileItemContentVariants({ state })}>
          {slots.thumbnail}

          <div className="gap-ws-2 flex min-w-0 flex-1 flex-col">{slots.info}</div>

          {(loading || isError || showRemove) && (
            <div className="gap-ws-7 flex shrink-0 items-center">
              {loading && (slots.loading.length > 0 ? slots.loading : <FileItemLoading />)}
              {isError && (
                <RiErrorWarningFill
                  aria-hidden="true"
                  focusable="false"
                  className="size-ws-control-md text-ws-semantic-negative shrink-0"
                />
              )}
              {showRemove && (
                // Figma: an `Icon Button` instance — Variant=Secondary, Style=Ghost, Size=Small.
                <IconButton
                  icon={RiDeleteBinLine}
                  variant="secondary"
                  preset="ghost"
                  size="sm"
                  onClick={onRemove}
                  defaultMotion={motion}
                  aria-label={
                    removeLabel ?? (slots.titleText ? `Remove ${slots.titleText}` : 'Remove file')
                  }
                />
              )}
            </div>
          )}
        </div>

        {showMessage && (
          <div className="gap-ws-3 flex flex-col">
            {error && (
              <span className="typography-label-strong-sm text-ws-semantic-negative">{error}</span>
            )}
            {slots.rest}
          </div>
        )}
      </div>
    );
  },
) as FileItemWithSubComponents;

FileItem.displayName = 'FileItem';
FileItem.Thumbnail = FileItemThumbnail;
FileItem.Title = FileItemTitle;
FileItem.Description = FileItemDescription;
FileItem.Loading = FileItemLoading;

export { FileItem };
