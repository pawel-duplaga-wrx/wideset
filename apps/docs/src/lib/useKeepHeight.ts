import { useEffect, useRef, useState } from 'react';

/**
 * The Preview's height, for the Code panel behind it (`CodePanel`): put `ref` on the preview
 * and pass `minHeight` on. The last height seen is kept while the preview is hidden.
 */
export const useKeepHeight = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? node.offsetHeight;
      if (height > 0) setMinHeight(height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  const attach = (element: T | null) => {
    (ref as React.MutableRefObject<T | null>).current = element;
    if (element) setNode(element);
  };
  return { ref: attach, minHeight };
};
