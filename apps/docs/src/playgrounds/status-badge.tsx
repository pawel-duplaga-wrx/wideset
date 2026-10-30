import {
  RiArchiveFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiTimeFill,
} from '@remixicon/react';
import { StatusBadge } from '@wideset/react';

import { playground } from '../lib/playground-kit';

/** Each colour carries the status it usually means, so the badge reads like a real one. */
const STATUS: Record<string, { label: string; icon: typeof RiTimeFill; iconName: string }> = {
  positive: { label: 'Paid', icon: RiCheckboxCircleFill, iconName: 'RiCheckboxCircleFill' },
  negative: { label: 'Overdue', icon: RiErrorWarningFill, iconName: 'RiErrorWarningFill' },
  notice: { label: 'Pending', icon: RiTimeFill, iconName: 'RiTimeFill' },
  info: { label: 'Draft', icon: RiInformationFill, iconName: 'RiInformationFill' },
  neutral: { label: 'Archived', icon: RiArchiveFill, iconName: 'RiArchiveFill' },
};

/** Colour, emphasis, shape and size come from `StatusBadgeProps`; the label follows the colour. */
export default playground({
  from: 'StatusBadgeProps',
  // Neutral is the component's default; a coloured badge shows more on the first look.
  defaults: { color: 'positive' },
  content: [{ key: 'icon', label: 'Icon', type: 'switch', default: true }],
  render: (v, { props }) => {
    const status = STATUS[String(v.color)];
    return (
      <StatusBadge {...props()}>
        {v.icon ? (
          <>
            <StatusBadge.Icon icon={status.icon} />
            <StatusBadge.Label>{status.label}</StatusBadge.Label>
          </>
        ) : (
          status.label
        )}
      </StatusBadge>
    );
  },
  code: (v, { attrs }) => {
    const status = STATUS[String(v.color)];
    const open = `<StatusBadge${attrs()}>`;
    if (!v.icon) return `${open}${status.label}</StatusBadge>`;
    return `${open}
  <StatusBadge.Icon icon={${status.iconName}} />
  <StatusBadge.Label>${status.label}</StatusBadge.Label>
</StatusBadge>`;
  },
});
