/**
 * Medium is the default. Small fits filter bars and table toolbars, large a search that is the main
 * entry point of the page. Match the size of the controls next to it.
 */
import { Search } from '@wideset/react';

export default function SearchSizes() {
  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Search key={size} size={size} placeholder="Search invoices" aria-label="Search invoices" />
      ))}
    </div>
  );
}
