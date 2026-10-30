import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import type { PopupTriggerProps } from './Popup.types';

const PopupTrigger = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Trigger>,
  PopupTriggerProps
>((props, ref) => <PopoverPrimitive.Trigger ref={ref} data-slot="popup-trigger" {...props} />);
PopupTrigger.displayName = 'Popup.Trigger';

export { PopupTrigger };
