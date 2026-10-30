import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import type { PopupCloseProps } from './Popup.types';

const PopupClose = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Close>,
  PopupCloseProps
>((props, ref) => <PopoverPrimitive.Close ref={ref} data-slot="popup-close" {...props} />);
PopupClose.displayName = 'Popup.Close';

export { PopupClose };
