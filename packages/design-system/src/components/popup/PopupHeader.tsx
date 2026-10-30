import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { PopupHeaderProps } from './Popup.types';

const PopupHeader = React.forwardRef<HTMLDivElement, PopupHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="popup-header"
      className={cn('border-ws-static-base px-ws-11 py-ws-9 border-b', className)}
      {...props}
    />
  ),
);
PopupHeader.displayName = 'Popup.Header';

export { PopupHeader };
