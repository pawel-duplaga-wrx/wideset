import * as React from 'react';
import { cn } from 'src/lib/utils';

import { usePopupLabelId } from './Popup.context';
import type { PopupTitleProps } from './Popup.types';

const PopupTitle = React.forwardRef<HTMLHeadingElement, PopupTitleProps>(
  ({ className, children, id: idProp, ...props }, ref) => {
    const id = usePopupLabelId('title', idProp);
    return (
      <h2
        ref={ref}
        id={id}
        data-slot="popup-title"
        className={cn('text-ws-static-strong typography-subtitle-sm', className)}
        {...props}
      >
        {children}
      </h2>
    );
  },
);
PopupTitle.displayName = 'Popup.Title';

export { PopupTitle };
