/**
 * A search field is a composed TextInput: a search icon in an inner prefix, `type="search"` on the input and a clear button in an inner suffix. `type="search"` makes screen readers announce a search field and gives mobile keyboards a search key. Clearing runs `onChange` with an empty value first, then `onClear` for anything that only belongs to the button, such as telling the user the full list is back. This composition replaces the deprecated `Search` component.
 */
import { RiSearchLine } from '@remixicon/react';
import { TextInput } from '@wideset/react';
import { useState } from 'react';

const invoices = ['Acme Corp', 'Acme Studio', 'Globex', 'Initech'];

export default function TextInputSearch() {
  const [query, setQuery] = useState('Acme');
  const [cleared, setCleared] = useState(false);
  const matches = invoices.filter((name) =>
    name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="gap-ws-4 flex w-[20rem] max-w-full flex-col">
      <TextInput
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setCleared(false);
        }}
      >
        <TextInput.Prefix inner>
          <TextInput.Icon icon={RiSearchLine} />
        </TextInput.Prefix>
        <TextInput.Input type="search" placeholder="Search invoices" aria-label="Search invoices" />
        <TextInput.Suffix inner>
          <TextInput.ClearButton onClear={() => setCleared(true)} />
        </TextInput.Suffix>
      </TextInput>
      <p role="status" className="typography-body-sm text-ws-static-subtle">
        {cleared
          ? `Search cleared. Showing all ${invoices.length} invoices.`
          : `${matches.length} of ${invoices.length} invoices match.`}
      </p>
    </div>
  );
}
