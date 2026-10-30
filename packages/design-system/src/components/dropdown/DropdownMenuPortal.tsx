import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { DropdownMenuPortalContext } from './DropdownMenu.context';
import type { DropdownMenuPortalProps } from './DropdownMenu.types';

// DropdownMenu.Content portals itself, so this wrapper is optional. When it is used, its
// `container` and `forceMount` must win: Content sees the flag and skips its own Portal.
export const DropdownMenuPortal = (props: DropdownMenuPortalProps) => (
  <DropdownMenuPortalContext.Provider value>
    <DropdownMenuPrimitive.Portal {...props} />
  </DropdownMenuPortalContext.Provider>
);

DropdownMenuPortal.displayName = 'DropdownMenu.Portal';
