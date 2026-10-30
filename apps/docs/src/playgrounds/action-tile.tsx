import { RiArrowRightLine, RiBankCardLine } from '@remixicon/react';
import { ActionTile } from '@wideset/react';

import { playground } from '../lib/playground-kit';

const TITLE = 'Billing details';
const DESCRIPTION = 'Update your card and invoice address';

/**
 * Variant and disabled come from `ActionTileProps`; the entity badge, the description and
 * the arrow are content. The tile always gets an `onClick`, so it renders a `<button>`.
 */
export default playground({
  from: 'ActionTileProps',
  // The native button type changes nothing on the stage.
  hide: ['type'],
  content: [
    { key: 'entity', label: 'Entity icon', type: 'switch', default: true },
    { key: 'description', label: 'Description', type: 'switch', default: true },
    { key: 'arrow', label: 'Arrow', type: 'switch', default: true },
  ],
  render: (v, { props }) => (
    <ActionTile
      {...props()}
      className="w-[20rem] max-w-full"
      title={TITLE}
      description={v.description ? DESCRIPTION : undefined}
      entity={v.entity ? RiBankCardLine : undefined}
      icon={v.arrow ? RiArrowRightLine : undefined}
      onClick={() => {}}
    />
  ),
  code: (v, { attrs }) => {
    const lines = [
      `title="${TITLE}"`,
      v.description && `description="${DESCRIPTION}"`,
      v.entity && 'entity={RiBankCardLine}',
      v.arrow && 'icon={RiArrowRightLine}',
      ...attrs().split(' '),
      'onClick={openBilling}',
    ].filter(Boolean);
    return `<ActionTile\n${lines.map((line) => `  ${line}`).join('\n')}\n/>`;
  },
});
