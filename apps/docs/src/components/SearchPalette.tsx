import { RiSearchLine } from '@remixicon/react';
import { Modal, Search } from '@wideset/react';
import { useEffect, useState } from 'react';

export type SearchItem = { title: string; href: string; group: string };

/**
 * Search across the docs: a field in the top bar that opens a dialog listing every page
 * and component. Type to narrow, click to go; ⌘K / Ctrl+K from anywhere.
 * ds-exempt: the trigger is a button dressed as a field, because a real input that only
 * opens a dialog would promise typing it does not accept; the results are plain links.
 */
const SearchPalette = ({ items }: { items: SearchItem[] }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((was) => !was);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const needle = query.trim().toLowerCase();
  const matches = (
    needle ? items.filter((item) => item.title.toLowerCase().includes(needle)) : items
  ).slice(0, 12);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-ws-forms-sm w-[15rem] items-center gap-ws-5 rounded-ws-control-lg border border-ws-static-subtle bg-ws-static-alpha-subtle px-ws-6 text-left typography-body-md text-ws-static-subtle hover:text-ws-static-base"
        aria-label="Search the documentation"
      >
        <RiSearchLine size={16} className="shrink-0" />
        <span className="min-w-0 flex-1 truncate">Search documentation…</span>
        <kbd className="rounded-ws-control-sm border border-ws-static-subtle px-ws-4 font-sans typography-caption-md text-ws-static-subtle">
          ⌘K
        </kbd>
      </button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Search</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Search
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search components and pages…"
            />
            <ul className="mt-ws-6 flex flex-col gap-ws-2">
              {matches.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex h-ws-15 items-center justify-between rounded-ws-control-lg px-ws-7 typography-body-md text-ws-static-strong hover:bg-ws-static-alpha-subtle"
                  >
                    <span>{item.title}</span>
                    <span className="typography-body-sm text-ws-static-subtle">{item.group}</span>
                  </a>
                </li>
              ))}
              {matches.length === 0 && (
                <li className="px-ws-7 py-ws-5 typography-body-md text-ws-static-subtle">
                  Nothing matches.
                </li>
              )}
            </ul>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SearchPalette;
