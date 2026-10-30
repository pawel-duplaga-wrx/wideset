import { cn } from 'src/lib/utils';

import type { FileItemLoadingProps } from './FileItem.types';
import { FileItemSpinner } from './FileItemSpinner';

/**
 * The upload spinner — a 16px glyph centred in the same 32px box the remove
 * button occupies, so the row's right edge does not shift when one replaces
 * the other. `FileItem` places it for you when `isLoading` is set.
 */
export const FileItemLoading = ({ className, ...props }: FileItemLoadingProps) => (
  <span
    data-slot="file-item-loading"
    className={cn('size-ws-14 flex shrink-0 items-center justify-center', className)}
    {...props}
  >
    <FileItemSpinner
      aria-hidden="true"
      focusable="false"
      className="size-ws-control-sm text-ws-dynamic-secondary-default animate-spin"
    />
  </span>
);

FileItemLoading.displayName = 'FileItem.Loading';
