import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import type { TooltipPortalProps } from './Tooltip.types';
import { TooltipPortalContext } from './TooltipContext';

// Tooltip.Content portals itself, so this wrapper is optional. When it is used, its `container`
// and `forceMount` must win: Content sees the flag and skips its own Portal.
export const TooltipPortal = (props: TooltipPortalProps) => (
  <TooltipPortalContext.Provider value>
    <TooltipPrimitive.Portal {...props} />
  </TooltipPortalContext.Provider>
);

TooltipPortal.displayName = 'Tooltip.Portal';
