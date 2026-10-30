/**
 * Medium is the default for forms. Small fits dense panels and inline comments, large a form where
 * writing is the main task. Match the size of the other fields in the form; `rows` sets the
 * starting height independently of the size.
 */
import { Textarea } from '@wideset/react';

export default function TextareaSizes() {
  return (
    <div className="gap-ws-12 flex w-[24rem] max-w-full flex-col">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Textarea
          key={size}
          size={size}
          rows={2}
          placeholder="Add a comment"
          aria-label="Comment"
        />
      ))}
    </div>
  );
}
