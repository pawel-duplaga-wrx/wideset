/**
 * `md` is the default, with body-size text. `sm` uses caption-size text and less padding, for
 * dense toolbars and tables where a larger tooltip would cover the row it explains. Use one size
 * per screen. Both are drawn open here with `open`; in an app leave it out, and the tooltip shows
 * on hover and keyboard focus.
 */
import { RiFilter3Line, RiShareLine } from '@remixicon/react';
import { IconButton, Tooltip } from '@wideset/react';

export default function TooltipSizes() {
  return (
    <div className="gap-ws-20 py-ws-5 flex w-[22rem] max-w-full flex-col">
      <Tooltip size="md" open>
        <Tooltip.Trigger asChild>
          <IconButton icon={RiShareLine} variant="secondary" preset="border" aria-label="Share" />
        </Tooltip.Trigger>
        <Tooltip.Content side="right">
          <Tooltip.Label>Share link</Tooltip.Label>
          <Tooltip.Description>Anyone with the link can view this file.</Tooltip.Description>
        </Tooltip.Content>
      </Tooltip>
      <Tooltip size="sm" open>
        <Tooltip.Trigger asChild>
          <IconButton
            icon={RiFilter3Line}
            variant="secondary"
            preset="border"
            aria-label="Filter"
          />
        </Tooltip.Trigger>
        <Tooltip.Content side="right">
          <Tooltip.Label>Filter</Tooltip.Label>
          <Tooltip.Description>Show only unpaid invoices.</Tooltip.Description>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
