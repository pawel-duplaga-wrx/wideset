/** The playground's stage: one divider with text, its props set from the rail. */
import { Divider, type DividerProps } from '@wideset/react';

export default function DividerDefault(props: DividerProps) {
  return (
    <div className="w-[20rem] max-w-full">
      <Divider text="or" {...props} />
    </div>
  );
}
