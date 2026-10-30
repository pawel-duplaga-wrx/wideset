import { RiMoonLine, RiSunLine } from '@remixicon/react';
import { IconButton } from '@wideset/react';

/** The sun/moon button in a preview frame's top-right corner (see `useFrameTheme`). */
const FrameThemeButton = ({ dark, onToggle }: { dark: boolean; onToggle: () => void }) => (
  <div className="absolute top-[7px] right-[7px] z-ws-base">
    <IconButton
      icon={dark ? RiSunLine : RiMoonLine}
      size="sm"
      preset="ghost"
      variant="secondary"
      aria-label={dark ? 'Show in light theme' : 'Show in dark theme'}
      onClick={onToggle}
    />
  </div>
);

export default FrameThemeButton;
