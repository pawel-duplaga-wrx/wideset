import * as PopoverPrimitive from '@radix-ui/react-popover';

import { PopupClose } from './PopupClose';
import { PopupContainer } from './PopupContainer';
import { PopupContent } from './PopupContent';
import { PopupDescription } from './PopupDescription';
import { PopupFooter } from './PopupFooter';
import { PopupHeader } from './PopupHeader';
import { PopupTitle } from './PopupTitle';
import { PopupTrigger } from './PopupTrigger';

const Popup = PopoverPrimitive.Root as typeof PopoverPrimitive.Root & {
  Close: typeof PopupClose;
  Container: typeof PopupContainer;
  Content: typeof PopupContent;
  Description: typeof PopupDescription;
  Footer: typeof PopupFooter;
  Header: typeof PopupHeader;
  Title: typeof PopupTitle;
  Trigger: typeof PopupTrigger;
};

Popup.displayName = 'Popup';
Popup.Close = PopupClose;
Popup.Container = PopupContainer;
Popup.Content = PopupContent;
Popup.Description = PopupDescription;
Popup.Footer = PopupFooter;
Popup.Header = PopupHeader;
Popup.Title = PopupTitle;
Popup.Trigger = PopupTrigger;

export { Popup };
