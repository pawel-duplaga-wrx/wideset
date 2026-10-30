import { cn } from 'src/lib/utils';

import type { FileItemTitleProps } from './FileItem.types';

/** The file name. `Label/Strong/Small` in `Static/Text/Strong`, truncated on one line. */
export const FileItemTitle = ({ className, ...props }: FileItemTitleProps) => (
  <span
    data-slot="file-item-title"
    className={cn('typography-label-strong-sm text-ws-static-strong truncate', className)}
    {...props}
  />
);

FileItemTitle.displayName = 'FileItem.Title';
