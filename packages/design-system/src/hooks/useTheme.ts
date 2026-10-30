import { useCallback, useSyncExternalStore } from 'react';

/*
  The `dark` class on <html> is the source of truth, read through useSyncExternalStore:
  - on the server there is no `document`, so React uses getServerSnapshot and nothing here is read;
  - during hydration React starts from that same server value and then switches to the real one,
    which avoids a hydration mismatch when the page is already dark;
  - every caller subscribes to the class, so two components using the hook, or code that changes
    the class directly, stay in sync.
*/
const isDark = () => document.documentElement.classList.contains('dark');
const isDarkOnServer = () => false;

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};

export function useTheme() {
  const isDarkTheme = useSyncExternalStore(subscribe, isDark, isDarkOnServer);

  const setDarkTheme = useCallback(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const setLightTheme = useCallback(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.toggle('dark');
  }, []);

  return { toggleTheme, setDarkTheme, setLightTheme, isDarkTheme };
}
