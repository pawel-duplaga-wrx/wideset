import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { PopupContainerContext } from './Popup.context';
import type { PopupContainerProps } from './Popup.types';
import { popupContainerClassName, popupContainerMotionVariants } from './Popup.variants';

const PopupContainer = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopupContainerProps
>(
  (
    {
      className,
      children,
      align = 'start',
      sideOffset = 8,
      persistent = false,
      portalContainer,
      defaultMotion,
      ...props
    },
    ref,
  ) => {
    const motion = useDefaultMotion(defaultMotion);
    const [titleId, setTitleId] = React.useState<string>();
    const [descriptionId, setDescriptionId] = React.useState<string>();
    const contextValue = React.useMemo(() => ({ setTitleId, setDescriptionId }), []);
    const content = (
      <PopoverPrimitive.Content
        ref={ref}
        data-slot="popup-container"
        aria-labelledby={props['aria-label'] ? undefined : titleId}
        aria-describedby={descriptionId}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          popupContainerClassName,
          popupContainerMotionVariants({ enabled: motion }),
          className,
        )}
        onPointerDownOutside={(event) => (persistent ? event.preventDefault() : undefined)}
        onEscapeKeyDown={(event) => (persistent ? event.preventDefault() : undefined)}
        {...props}
      >
        <PopupContainerContext.Provider value={contextValue}>
          {children}
        </PopupContainerContext.Provider>
      </PopoverPrimitive.Content>
    );

    // Portals to document.body by default, like Select.Content: rendered in place the popup is
    // clipped by a Modal / Sidepanel and trapped in their stacking context, below z-ws-popout.
    // The Portal gates mounting on its own forceMount, so Content forceMount must reach it too.
    return (
      <PopoverPrimitive.Portal container={portalContainer} forceMount={props.forceMount}>
        {content}
      </PopoverPrimitive.Portal>
    );
  },
);
PopupContainer.displayName = 'Popup.Container';

export { PopupContainer };
