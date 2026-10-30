import * as SidepanelPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';

import type { SidepanelCloseProps, SidepanelProps, SidepanelTriggerProps } from './Sidepanel.types';
import { SidepanelActions } from './SidepanelActions';
import { SidepanelContent } from './SidepanelContent';
import { SidepanelDescription } from './SidepanelDescription';
import { SidepanelFooter } from './SidepanelFooter';
import { SidepanelHeader } from './SidepanelHeader';
import { SidepanelPanel } from './SidepanelPanel';
import { SidepanelTitle } from './SidepanelTitle';

// Build the compound as its OWN component object — do NOT alias and mutate
// SidepanelPrimitive.Root directly. @radix-ui/react-dialog's Root is a shared
// singleton also used by Modal (and StatusModal), so aliasing + mutating it
// makes Sidepanel and Modal the same object and collides on every shared name.
// Wrapping Root in a fresh component keeps each namespace isolated.
const Sidepanel = ((props: SidepanelProps) => (
  <SidepanelPrimitive.Root {...props} />
)) as React.FC<SidepanelProps> & {
  Close: typeof SidepanelClose;
  Panel: typeof SidepanelPanel;
  Description: typeof SidepanelDescription;
  Footer: typeof SidepanelFooter;
  Content: typeof SidepanelContent;
  Header: typeof SidepanelHeader;
  Title: typeof SidepanelTitle;
  Actions: typeof SidepanelActions;
  Trigger: typeof SidepanelTrigger;
};

Sidepanel.displayName = 'Sidepanel';
export const SidepanelClose = React.forwardRef<
  React.ComponentRef<typeof SidepanelPrimitive.Close>,
  SidepanelCloseProps
>((props, ref) => <SidepanelPrimitive.Close ref={ref} data-slot="sidepanel-close" {...props} />);
SidepanelClose.displayName = 'Sidepanel.Close';
Sidepanel.Close = SidepanelClose;
Sidepanel.Panel = SidepanelPanel;
Sidepanel.Description = SidepanelDescription;
Sidepanel.Footer = SidepanelFooter;
Sidepanel.Content = SidepanelContent;
Sidepanel.Header = SidepanelHeader;
Sidepanel.Title = SidepanelTitle;
Sidepanel.Actions = SidepanelActions;
export const SidepanelTrigger = React.forwardRef<
  React.ComponentRef<typeof SidepanelPrimitive.Trigger>,
  SidepanelTriggerProps
>((props, ref) => (
  <SidepanelPrimitive.Trigger ref={ref} data-slot="sidepanel-trigger" {...props} />
));
SidepanelTrigger.displayName = 'Sidepanel.Trigger';
Sidepanel.Trigger = SidepanelTrigger;

export { Sidepanel };
