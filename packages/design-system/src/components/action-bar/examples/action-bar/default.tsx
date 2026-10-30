/**
 * The playground's stage: an open action bar for three selected rows, its props set from the
 * rail. The transformed box contains the fixed bar, so it sits at the box's edge, not the viewport's.
 */
import { RiDeleteBinLine, RiDownloadLine, RiMoreFill } from '@remixicon/react';
import { ActionBar, type ActionBarProps, IconButton } from '@wideset/react';

export default function ActionBarDefault(props: ActionBarProps) {
  return (
    <div className="relative h-[5.5rem] w-[30rem] max-w-full [transform:translateZ(0)] overflow-hidden">
      <ActionBar isOpen amountSelected={3} onClose={() => {}} {...props}>
        <IconButton
          preset="border"
          variant="secondary"
          size="sm"
          icon={RiDownloadLine}
          aria-label="Download"
        />
        <IconButton
          preset="border"
          variant="danger"
          size="sm"
          icon={RiDeleteBinLine}
          aria-label="Delete"
        />
        <IconButton
          preset="border"
          variant="secondary"
          size="sm"
          icon={RiMoreFill}
          aria-label="More actions"
        />
      </ActionBar>
    </div>
  );
}
