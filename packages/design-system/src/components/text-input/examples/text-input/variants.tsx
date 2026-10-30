/**
 * Primary is the default for every field. Danger marks a value that failed validation and sets
 * `aria-invalid` on the input: switch to it after the user leaves the field or submits. Put the
 * reason in the FormField's `errorText`, which the field links to the input with
 * `aria-describedby`, because the red border alone does not tell screen reader users why.
 */
import { TextInput } from '@wideset/react';
import { useState } from 'react';

export default function TextInputVariants() {
  const [email, setEmail] = useState('anna.kowalska@');

  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      <TextInput variant="primary" placeholder="Project name" aria-label="Project name" />
      <TextInput
        variant="danger"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        aria-label="Email"
      />
    </div>
  );
}
