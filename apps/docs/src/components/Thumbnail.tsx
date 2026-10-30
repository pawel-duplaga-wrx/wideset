import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { PLAYGROUNDS, withPlayground } from '../lib/playground';

/** Room left around the component inside the frame, in px, on each side. */
const INSET = 16;

/**
 * A gallery card's picture: the component as its page's playground opens, live but inert —
 * the whole card is the link, so nothing inside takes focus or clicks. It renders at its
 * real size and only scales down when the card is smaller than the composition, so a
 * button reads as a button and a table still fits. It mounts on the client for the same
 * reason the stage does: some components reach for `document` while rendering.
 */
const Thumbnail = ({ component }: { component: string }) => {
  const definition = PLAYGROUNDS[component];
  const frame = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted || !frame.current || !content.current) return;
    const fit = () => {
      const box = frame.current!.getBoundingClientRect();
      const inner = content.current!;
      const ratio = Math.min(
        1,
        (box.width - INSET * 2) / inner.offsetWidth,
        (box.height - INSET * 2) / inner.offsetHeight,
      );
      setScale(Number.isFinite(ratio) && ratio > 0 ? ratio : 1);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(frame.current);
    observer.observe(content.current);
    return () => observer.disconnect();
  }, [mounted]);

  const stage = definition?.stage?.(definition.defaults);

  return (
    <div
      ref={frame}
      inert
      aria-hidden="true"
      className={`docs-frame pointer-events-none relative min-h-0 flex-1 overflow-hidden rounded-ws-container-lg ${stage ?? ''}`}
    >
      {mounted && definition && (
        <div
          ref={content}
          className="absolute top-1/2 left-1/2 w-max"
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        >
          {definition.preview ? definition.preview() : definition.render(definition.defaults)}
        </div>
      )}
    </div>
  );
};

export default withPlayground(Thumbnail);
