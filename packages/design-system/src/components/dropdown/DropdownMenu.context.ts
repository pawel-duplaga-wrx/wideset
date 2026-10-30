import { createContext, useContext } from 'react';

type DropdownMenuContextValue = {
  motion?: boolean;
};

export const DropdownMenuContext = createContext<DropdownMenuContextValue>({});

export const useDropdownMenuContext = () => useContext(DropdownMenuContext);

/** True inside `DropdownMenu.Portal`: `DropdownMenu.Content` then renders into it instead of its own portal. */
export const DropdownMenuPortalContext = createContext(false);
