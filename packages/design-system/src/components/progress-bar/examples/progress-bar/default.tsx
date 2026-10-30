/** The playground's stage: one upload bar with its label and description, its props set from the rail. */
import { ProgressBar, type ProgressBarProps } from '@wideset/react';

export default function ProgressBarDefault(props: Partial<ProgressBarProps>) {
  return (
    <div className="w-[20rem] max-w-full">
      <ProgressBar
        value={65}
        label="Uploading assets"
        description="12 of 18 files uploaded"
        {...props}
      />
    </div>
  );
}
