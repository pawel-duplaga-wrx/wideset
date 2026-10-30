/**
 * Medium is the default for forms. Small fits dense tables and filter bars, large a short form
 * that is the main task on the page. Match the size of the buttons and selects next to the field,
 * and use one size per form.
 */
import { TextInput } from '@wideset/react';

export default function TextInputSizes() {
  return (
    <div className="gap-ws-12 flex w-[20rem] max-w-full flex-col">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TextInput key={size} size={size} placeholder="Project name" aria-label="Project name" />
      ))}
    </div>
  );
}
