/**
 * An icon before the label reinforces what the action does; an icon after it suggests direction
 * or a next step. The icon is hidden from screen readers, so the label alone names the button.
 * Keep the label: a button with only an icon is an Icon button and needs an `aria-label`.
 */
import { RiArrowRightLine, RiDownloadLine } from '@remixicon/react';
import { Button } from '@wideset/react';

export default function ButtonIcons() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <Button preset="border">
        <Button.Icon icon={RiDownloadLine} />
        Download invoice
      </Button>
      <Button>
        Continue
        <Button.Icon icon={RiArrowRightLine} />
      </Button>
    </div>
  );
}
