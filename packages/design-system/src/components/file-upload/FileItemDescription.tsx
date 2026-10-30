import { Children, Fragment } from 'react';
import { cn } from 'src/lib/utils';

import type { FileItemDescriptionProps } from './FileItem.types';

/**
 * The secondary line under the title — size, time left. Each child is one
 * item; items are separated by Figma's 16px vertical rule.
 */
export const FileItemDescription = ({
  className,
  children,
  ...props
}: FileItemDescriptionProps) => {
  const items = Children.toArray(children).filter((item) => item !== '');

  return (
    <span
      data-slot="file-item-description"
      className={cn(
        'typography-label-sm text-ws-static-subtle gap-ws-5 flex items-center',
        className,
      )}
      {...props}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <span
              aria-hidden="true"
              className="border-ws-static-base h-ws-9 w-0 shrink-0 border-l"
            />
          )}
          <span className="truncate">{item}</span>
        </Fragment>
      ))}
    </span>
  );
};

FileItemDescription.displayName = 'FileItem.Description';
