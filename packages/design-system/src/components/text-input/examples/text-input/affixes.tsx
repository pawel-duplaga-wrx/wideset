/** An affix outside the field (`Prefix`, `Suffix`) is for fixed text the user does not type, such as a protocol or a unit. With `inner` it sits inside the frame, for an icon or an icon button. Clicking an affix focuses the input; the clear button only appears while the field holds a value. */
import { RiFileCopyLine, RiSearchLine } from '@remixicon/react';
import { TextInput } from '@wideset/react';
import { useState } from 'react';

export default function TextInputAffixes() {
  const [query, setQuery] = useState('Quarterly report');

  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      <TextInput>
        <TextInput.Prefix>https://</TextInput.Prefix>
        <TextInput.Input placeholder="your-company" aria-label="Website" />
        <TextInput.Suffix>.com</TextInput.Suffix>
      </TextInput>
      <TextInput value={query} onChange={(event) => setQuery(event.target.value)}>
        <TextInput.Prefix inner>
          <TextInput.Icon icon={RiSearchLine} />
        </TextInput.Prefix>
        <TextInput.Input placeholder="Search files" aria-label="Search files" />
        <TextInput.Suffix inner>
          <TextInput.ClearButton />
        </TextInput.Suffix>
      </TextInput>
      <TextInput>
        <TextInput.Prefix>$</TextInput.Prefix>
        <TextInput.Input placeholder="0.00" aria-label="Amount" />
        <TextInput.Suffix inner>
          <TextInput.IconButton icon={RiFileCopyLine} aria-label="Copy amount" />
        </TextInput.Suffix>
      </TextInput>
    </div>
  );
}
