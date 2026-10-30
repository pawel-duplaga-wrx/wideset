import { useCallback, useEffect, useRef } from 'react';

export const useShake = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => () => cleanupRef.current?.(), []);

  const shake = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    cleanupRef.current?.();
    const { ownerDocument } = element;
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.animationName !== 'ws-field-shake') return;
      if (!(event.target instanceof Node) || !event.target.contains(element)) return;
      cleanup();
    };
    const cleanup = () => {
      element.removeAttribute('data-shake');
      ownerDocument.removeEventListener('animationend', handleAnimationEnd);
      ownerDocument.removeEventListener('animationcancel', handleAnimationEnd);
      cleanupRef.current = null;
    };
    element.removeAttribute('data-shake');
    void element.offsetWidth;
    element.setAttribute('data-shake', 'true');
    ownerDocument.addEventListener('animationend', handleAnimationEnd);
    ownerDocument.addEventListener('animationcancel', handleAnimationEnd);
    cleanupRef.current = cleanup;
  }, []);

  return { ref, shake };
};
