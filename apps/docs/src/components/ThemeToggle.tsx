import { RiMoonLine, RiSunLine } from '@remixicon/react';
import { IconButton } from '@wideset/react';
import { useEffect, useState } from 'react';

import { commitAppearance, isDark, loadAppearance, onAppearanceChange } from '../lib/theme';

/**
 * Light or dark, one press. A "system" preference collapses to whichever side it currently
 * resolves to. Renders as dark until mounted, matching what the head script most often set.
 */
const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(isDark(loadAppearance()));
    return onAppearanceChange((value) => setDark(isDark(value)));
  }, []);

  return (
    <IconButton
      icon={dark ? RiSunLine : RiMoonLine}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      size="sm"
      preset="ghost"
      variant="secondary"
      onClick={() => commitAppearance(dark ? 'light' : 'dark')}
    />
  );
};

export default ThemeToggle;
