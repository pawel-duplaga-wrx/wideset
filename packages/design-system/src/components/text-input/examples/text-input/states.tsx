/**
 * A disabled field cannot be focused and is skipped by the keyboard, so use it only when the user
 * can tell why it is unavailable. `TextInput.ClearButton` in an inner suffix appears once the field
 * holds a value and hides again when it is empty or disabled; after clearing, focus returns to the
 * input.
 */
import { TextInput } from '@wideset/react';
import { useState } from 'react';

export default function TextInputStates() {
  const [name, setName] = useState('Website redesign');

  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      <TextInput placeholder="Project name" aria-label="Project name" />
      <TextInput disabled placeholder="Project name" aria-label="Project name" />
      <TextInput value={name} onChange={(event) => setName(event.target.value)}>
        <TextInput.Input placeholder="Project name" aria-label="Project name" />
        <TextInput.Suffix inner>
          <TextInput.ClearButton />
        </TextInput.Suffix>
      </TextInput>
    </div>
  );
}
