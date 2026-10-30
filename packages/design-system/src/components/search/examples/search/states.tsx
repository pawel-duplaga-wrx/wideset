/**
 * The clear button appears while the field holds a value and is enabled; clearing it returns focus
 * to the input and calls `onClear`. Pass `showClearButton={false}` when something else resets the
 * query. A disabled search cannot be focused, so keep it only when the user can tell why.
 */
import { Search } from '@wideset/react';
import { useState } from 'react';

export default function SearchStates() {
  const [query, setQuery] = useState('Invoice #1042');

  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      <Search placeholder="Search invoices" aria-label="Search invoices" />
      <Search disabled placeholder="Search invoices" aria-label="Search invoices" />
      <Search
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search invoices"
        aria-label="Search invoices"
      />
    </div>
  );
}
