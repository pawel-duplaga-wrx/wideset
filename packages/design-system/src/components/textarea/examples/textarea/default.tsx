/** The playground's stage: one empty textarea with a placeholder, its props set from the rail. */
import { Textarea, type TextareaProps } from '@wideset/react';

export default function TextareaDefault(props: TextareaProps) {
  return (
    <div className="w-[20rem] max-w-full">
      <Textarea
        rows={3}
        aria-label="Release notes"
        placeholder="Tell the team what changed in this release…"
        {...props}
      />
    </div>
  );
}
