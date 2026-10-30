import { createContext, useContext } from 'react';

import type { AvatarGroupContextType } from './Avatar.types';

export const AvatarGroupContext = createContext<AvatarGroupContextType | undefined>(undefined);

export const useAvatarGroupContext = () => useContext(AvatarGroupContext);
