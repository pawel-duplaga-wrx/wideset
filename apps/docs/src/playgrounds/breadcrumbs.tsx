import { RiHome5Line } from '@remixicon/react';
import { Breadcrumbs } from '@wideset/react';

import { options, playground } from '../lib/playground-kit';

const PAGES = ['Home', 'Projects', 'Wideset', 'Settings'];

const pages = (depth: unknown) => PAGES.slice(0, Number(depth));

/**
 * The separator comes from `BreadcrumbsProps`; left out, none is drawn ("None" on the rail),
 * so the snippet prints it whenever one is set.
 */
export default playground({
  from: 'BreadcrumbsProps',
  optional: { separator: 'None' },
  defaults: { separator: 'arrow' },
  content: [
    {
      key: 'depth',
      label: 'Levels',
      type: 'select',
      options: options('2', '3', '4'),
      default: '3',
    },
    { key: 'icon', label: 'Home icon', type: 'switch', default: true },
  ],
  render: (v, { props }) => (
    <Breadcrumbs {...props()}>
      {pages(v.depth).map((page, index) => (
        <Breadcrumbs.Item key={page}>
          {index === 0 && v.icon && <RiHome5Line className="size-ws-9" />}
          {page}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  ),
  code: (v, { attrs }) =>
    [
      `<Breadcrumbs${attrs()}>`,
      ...pages(v.depth).map((page, index) =>
        index === 0 && v.icon
          ? `  <Breadcrumbs.Item>\n    <RiHome5Line className="size-ws-9" />\n    ${page}\n  </Breadcrumbs.Item>`
          : `  <Breadcrumbs.Item>${page}</Breadcrumbs.Item>`,
      ),
      '</Breadcrumbs>',
    ].join('\n'),
});
