import * as React from 'react';

import type { TooltipSize, TooltipVariant } from './Tooltip.types';

export const TooltipContext = React.createContext<{
  variant: TooltipVariant;
  size: TooltipSize;
  arrow: boolean;
  motion?: boolean;
}>({
  variant: 'default',
  size: 'md',
  arrow: true,
});

/** True inside `Tooltip.Portal`: `Tooltip.Content` then renders into it instead of its own portal. */
export const TooltipPortalContext = React.createContext(false);
