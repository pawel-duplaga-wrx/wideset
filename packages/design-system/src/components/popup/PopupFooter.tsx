import * as React from 'react';
import { cn } from 'src/lib/utils';

import type { PopupFooterProps } from './Popup.types';

const PopupFooter = React.forwardRef<HTMLDivElement, PopupFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="popup-footer"
      className={cn(
        'border-ws-static-base bg-ws-static-alpha-subtle rounded-b-ws-container-lg gap-ws-5 px-ws-11 py-ws-9 flex items-center justify-end border-t',
        className,
      )}
      {...props}
    />
  ),
);
PopupFooter.displayName = 'Popup.Footer';

export { PopupFooter };
