/**
 * Border is the default, for a search field on the page. Ghost drops the frame until hover and
 * focus, for a search placed inside a surface that already has one, such as a toolbar, a table
 * header or a dropdown.
 */
import { Search } from '@wideset/react';

export default function SearchPresets() {
  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      {(['border', 'ghost'] as const).map((preset) => (
        <Search
          key={preset}
          preset={preset}
          placeholder="Search invoices"
          aria-label="Search invoices"
        />
      ))}
    </div>
  );
}
