import { useEffect, useState } from 'react';

/** Whether the page is dark right now; follows the theme toggle in the top bar. */
const usePageDark = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setDark(root.classList.contains('dark'));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return dark;
};

/**
 * The theme of one preview frame (the Preview stage, an example): it follows the page until
 * the frame's own sun/moon button switches it. `frameClass` goes on the frame: `dark`, or
 * `docs-light` to show light on a dark page; empty until mounted, so a dark page never
 * flashes a white frame.
 */
export const useFrameTheme = (mounted: boolean) => {
  const pageDark = usePageDark();
  const [override, setOverride] = useState<'light' | 'dark' | null>(null);
  const dark = override ? override === 'dark' : pageDark;
  return {
    dark,
    toggle: () => setOverride(dark ? 'light' : 'dark'),
    frameClass: mounted ? (dark ? 'dark' : 'docs-light') : '',
  };
};
