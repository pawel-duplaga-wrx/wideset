import * as React from 'react';
import { cn } from 'src/lib/utils';

import { usePopupLabelId } from './Popup.context';
import type { PopupDescriptionProps } from './Popup.types';

const PopupDescription = React.forwardRef<HTMLParagraphElement, PopupDescriptionProps>(
  ({ className, id: idProp, ...props }, ref) => {
    const id = usePopupLabelId('description', idProp);
    return (
      <p
        ref={ref}
        id={id}
        data-slot="popup-description"
        className={cn('text-ws-static-subtle typography-body-md', className)}
        {...props}
      />
    );
  },
);
PopupDescription.displayName = 'Popup.Description';

export { PopupDescription };
