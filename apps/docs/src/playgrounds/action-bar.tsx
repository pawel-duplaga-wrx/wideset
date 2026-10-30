import { RiDeleteBinLine, RiDownloadLine, RiMoreFill } from '@remixicon/react';
import { ActionBar, Button, IconButton } from '@wideset/react';

import { playground, type Values } from '../lib/playground-kit';

const actions = (v: Values) =>
  v.actions === 'labelled' ? (
    <>
      <Button preset="border" variant="secondary" size="sm">
        <Button.Icon icon={RiDownloadLine} />
        Download
      </Button>
      <Button preset="border" variant="danger" size="sm">
        <Button.Icon icon={RiDeleteBinLine} />
        Delete
      </Button>
    </>
  ) : (
    <>
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
    </>
  );

const actionsCode = (v: Values) =>
  v.actions === 'labelled'
    ? [
        '  <Button preset="border" variant="secondary" size="sm">',
        '    <Button.Icon icon={RiDownloadLine} />',
        '    Download',
        '  </Button>',
        '  <Button preset="border" variant="danger" size="sm">',
        '    <Button.Icon icon={RiDeleteBinLine} />',
        '    Delete',
        '  </Button>',
      ]
    : [
        '  <IconButton preset="border" variant="secondary" size="sm" icon={RiDownloadLine} aria-label="Download" />',
        '  <IconButton preset="border" variant="danger" size="sm" icon={RiDeleteBinLine} aria-label="Delete" />',
        '  <IconButton preset="border" variant="secondary" size="sm" icon={RiMoreFill} aria-label="More actions" />',
      ];

/**
 * Position and align come from `ActionBarProps`. ActionBar is `position: fixed`: the
 * transformed box below contains it, so it sits at the bottom (or top) of that box instead
 * of the viewport, and stays inside the thumbnail. `isOpen` is always on here.
 */
export default playground({
  from: 'ActionBarProps',
  hide: ['isOpen'],
  content: [
    { key: 'close', label: 'Close button', type: 'switch', default: true },
    { key: 'count', label: 'Selected count', type: 'switch', default: true },
    {
      key: 'actions',
      label: 'Actions',
      type: 'select',
      options: [
        { label: 'Icon buttons', value: 'icons' },
        { label: 'Labelled buttons', value: 'labelled' },
      ],
      default: 'icons',
    },
  ],
  render: (v, { props }) => (
    <div className="relative h-[5.5rem] w-[30rem] max-w-full [transform:translateZ(0)] overflow-hidden">
      <ActionBar
        {...props()}
        isOpen
        amountSelected={v.count ? 3 : undefined}
        onClose={v.close ? () => {} : undefined}
      >
        {actions(v)}
      </ActionBar>
    </div>
  ),
  code: (v, { attrs }) => {
    const extra = [v.count && ' amountSelected={3}', v.close && ' onClose={clearSelection}']
      .filter(Boolean)
      .join('');
    return [`<ActionBar isOpen${attrs()}${extra}>`, ...actionsCode(v), '</ActionBar>'].join('\n');
  },
});
