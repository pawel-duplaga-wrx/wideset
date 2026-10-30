/**
 * `bottom` (the default) keeps the bar out of the way of the table header and the page title;
 * use `top` when something else already sits at the bottom of the screen, such as a cookie
 * banner or a chat button. The bar is fixed to the viewport: each box here contains it only so
 * the example stays on the card.
 */
import { RiDeleteBinLine, RiDownloadLine } from '@remixicon/react';
import { ActionBar, Button } from '@wideset/react';

export default function ActionBarPositions() {
  return (
    <div className="gap-ws-9 flex w-[30rem] max-w-full flex-col">
      {(['bottom', 'top'] as const).map((position) => (
        <div
          key={position}
          className="rounded-ws-control-lg border-ws-static-base relative h-[9rem] [transform:translateZ(0)] overflow-hidden border"
        >
          <ActionBar isOpen position={position} amountSelected={3} onClose={() => {}}>
            <Button preset="border" variant="secondary" size="sm">
              <Button.Icon icon={RiDownloadLine} />
              Download
            </Button>
            <Button preset="border" variant="danger" size="sm">
              <Button.Icon icon={RiDeleteBinLine} />
              Delete
            </Button>
          </ActionBar>
        </div>
      ))}
    </div>
  );
}
