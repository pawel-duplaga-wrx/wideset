import { cn } from '@wideset/react';
import { useEffect, useState } from 'react';

/**
 * The page's own table of contents, in the rail: one row per section, the current one
 * marked as the reader scrolls. Sections are `<section id>` elements the page lists here.
 */
const OnThisPage = ({ items }: { items: { id: string; label: string }[] }) => {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    // The section whose top is nearest below the bar wins; the last one past it otherwise.
    const pick = () => {
      const line = 96;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top - line <= 0) current = section.id;
      }
      // At the bottom of the page the last sections can never reach the bar: the last one wins.
      // Only on a page that scrolls: one that fits the window is "at the bottom" from the start.
      const scrollable = document.documentElement.scrollHeight > innerHeight + 2;
      const atBottom =
        scrollable && innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? sections[sections.length - 1].id : current);
    };
    pick();
    addEventListener('scroll', pick, { passive: true });
    return () => removeEventListener('scroll', pick);
  }, [items]);

  // Collapsed, the contents is a column of ticks, one per section, the current one dark; on
  // hover or keyboard focus the same rows open into a panel with the labels. The ticks are
  // the links, so the panel never needs focus of its own.
  return (
    <nav aria-label="On this page" className="group relative">
      <ul className="flex flex-col items-end py-ws-3">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={isActive ? 'location' : undefined}
                className="flex h-ws-8 items-center"
              >
                <span
                  className={cn(
                    'h-[2px] rounded-full transition-colors',
                    isActive ? 'bg-ws-static-strong w-ws-9' : 'w-ws-7 bg-ws-static-alpha-strong',
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
      <div
        aria-hidden
        className="docs-toc-panel invisible absolute top-0 right-0 z-10 w-[14rem] rounded-ws-container-lg border border-ws-static-subtle p-ws-3 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
      >
        <p className="px-ws-5 py-ws-3 typography-caption-strong-md text-ws-static-subtle">
          On this page
        </p>
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                tabIndex={-1}
                className={cn(
                  'flex h-ws-12 items-center rounded-ws-control-md px-ws-5 typography-body-sm transition-colors',
                  item.id === active
                    ? 'text-ws-static-strong'
                    : 'text-ws-static-subtle hover:bg-ws-static-alpha-subtle hover:text-ws-static-strong',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default OnThisPage;
