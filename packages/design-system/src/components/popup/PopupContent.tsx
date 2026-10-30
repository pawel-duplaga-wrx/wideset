import * as React from 'react';
import { cn } from 'src/lib/utils';

import { ScrollArea } from '../scroll-area/ScrollArea';
import type { PopupContentProps } from './Popup.types';

const PopupContent = React.forwardRef<HTMLDivElement, PopupContentProps>(
  ({ className, contentClassName, children, ...props }, ref) => (
    <ScrollArea className={cn('grow', className)}>
      <div
        ref={ref}
        data-slot="popup-content"
        className={cn('p-ws-11 min-h-full', contentClassName)}
        {...props}
      >
        {children}
      </div>
    </ScrollArea>
  ),
);
PopupContent.displayName = 'Popup.Content';

export { PopupContent };
