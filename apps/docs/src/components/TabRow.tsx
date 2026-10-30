/**
 * Holds a `Tabs.List` (on `<Tabs divider={false}>`) inside the reading column: a row with more
 * tabs than fit scrolls sideways with no scrollbar, and the divider is drawn here, so it spans
 * the column rather than only the list. `pb-px` keeps the active underline, which hangs 1px
 * below the list, inside the scroll box and on top of the divider.
 */
const TabRow = ({ children }: { children: React.ReactNode }) => (
  <div className="docs-scroll min-w-0 overflow-x-auto pb-px shadow-[inset_0_-1px_0_var(--border-color-ws-static-subtle)]">
    {children}
  </div>
);

export default TabRow;
