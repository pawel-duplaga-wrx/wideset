/** The playground's stage: the closed trigger; hover or focus it to see the tooltip. */
import { RiShareLine } from '@remixicon/react';
import { IconButton, Tooltip, type TooltipProps } from '@wideset/react';

export default function TooltipDefault(props: TooltipProps) {
  return (
    <Tooltip {...props}>
      <Tooltip.Trigger asChild>
        <IconButton icon={RiShareLine} variant="secondary" preset="border" aria-label="Share" />
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Label>Share link</Tooltip.Label>
      </Tooltip.Content>
    </Tooltip>
  );
}
