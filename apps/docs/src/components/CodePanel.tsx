import { Button } from '@wideset/react';
import { useEffect, useRef, useState } from 'react';

/**
 * The Code tab's frame: exactly as tall as the Preview it sits behind, so switching tabs never
 * moves the page. Shorter code stretches to fill it; longer code is folded at that height with
 * a "Show more" at the bottom that opens the rest.
 */
const CodePanel = ({ height, children }: { height?: number; children: React.ReactNode }) => {
  const content = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = content.current;
    if (!el || !height) return;
    const check = () => setOverflows(el.scrollHeight > height + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [height]);

  const folded = overflows && !open;
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-ws-container-lg"
      style={{ minHeight: height, maxHeight: folded ? height : undefined }}
    >
      <div ref={content} className="flex flex-1 flex-col">
        {children}
      </div>
      {folded && (
        <div className="docs-fade absolute inset-x-0 bottom-0 flex h-ws-25 items-end justify-center pb-ws-8">
          <Button size="sm" preset="border" variant="secondary" onClick={() => setOpen(true)}>
            Show more
          </Button>
        </div>
      )}
    </div>
  );
};

export default CodePanel;
