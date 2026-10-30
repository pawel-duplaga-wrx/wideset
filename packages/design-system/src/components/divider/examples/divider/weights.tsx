/**
 * Default suits most section breaks. Thin is for separators inside a section, such as between
 * list rows; bold marks a major break, such as the end of a form's main part. A heavier line
 * splits the page more strongly, so use the lightest one that does the job.
 */
import { Divider } from '@wideset/react';

export default function DividerWeights() {
  return (
    <div className="gap-ws-11 flex w-[20rem] max-w-full flex-col">
      {(['thin', 'default', 'bold'] as const).map((weight) => (
        <Divider key={weight} weight={weight} />
      ))}
    </div>
  );
}
