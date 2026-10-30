/**
 * `default` is a dark tooltip for light screens; `inverse` is a light one for dark or coloured
 * surfaces, where a dark tooltip would blend in. Pick by the background behind the trigger, not
 * by importance. Both are drawn open here with `open`; in an app leave it out, and the tooltip
 * shows on hover and keyboard focus. Screen readers announce it as the trigger's description, so
 * an icon-only trigger still needs its own `aria-label`.
 */
import { RiDownloadLine, RiShareLine } from '@remixicon/react';
import { IconButton, Tooltip } from '@wideset/react';

export default function TooltipVariants() {
  return (
    <div className="gap-ws-20 py-ws-5 flex w-[22rem] max-w-full flex-col">
      <Tooltip variant="default" open>
        <Tooltip.Trigger asChild>
          <IconButton icon={RiShareLine} variant="secondary" preset="border" aria-label="Share" />
        </Tooltip.Trigger>
        <Tooltip.Content side="right">
          <Tooltip.Label>Share link</Tooltip.Label>
          <Tooltip.Description>Anyone with the link can view this file.</Tooltip.Description>
        </Tooltip.Content>
      </Tooltip>
      <Tooltip variant="inverse" open>
        <Tooltip.Trigger asChild>
          <IconButton
            icon={RiDownloadLine}
            variant="secondary"
            preset="border"
            aria-label="Download"
          />
        </Tooltip.Trigger>
        <Tooltip.Content side="right">
          <Tooltip.Label>Download</Tooltip.Label>
          <Tooltip.Description>Saves Invoice #1042 as a PDF.</Tooltip.Description>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
