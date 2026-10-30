import { RiFlashlightFill } from '@remixicon/react';
import { Description, Stories, Title } from '@storybook/addon-docs/blocks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SVGProps } from 'react';

// Custom docs page: render each story once (default autodocs duplicates the
// primary story into the "Stories" list when the meta has no `component`).
const DocsPage = () => (
  <>
    <Title />
    <Description />
    <Stories includePrimary title="" />
  </>
);

const meta = {
  title: 'Foundation/Icons',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: DocsPage,
      description: {
        component: `
The design system does not ship its own icon set. They come from **Remix Icon** — a set of 3,200+
tree-shakable icons. Browse and search the full set at
<strong><a href="https://remixicon.com" target="_blank" rel="noreferrer">remixicon.com</a></strong>,
then import the icon by name. Every component that takes an icon accepts any \`Ri*\` component
directly, as well as custom icons (see Custom Icons below).

### Install

\`\`\`bash
pnpm add @remixicon/react
\`\`\`

### Use

\`\`\`tsx
import { RiHeartLine } from '@remixicon/react';
import { IconButton } from '@wideset/react';

<RiHeartLine className="text-ws-600 text-ws-static-strong" />
<IconButton icon={RiHeartLine} />
\`\`\`

Import icons individually (as above) to keep consumer bundles tree-shaken. Remix Icon is free for
personal and commercial use under the Remix Icon License v1.0.
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const SIZE_EXAMPLES = [
  { cls: 'text-ws-400', label: '16px' },
  { cls: 'text-ws-600', label: '24px' },
  { cls: 'text-ws-800', label: '32px' },
  { cls: 'text-ws-1200', label: '48px' },
];

export const Sizing: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Icons are reset to `1em`, so they are sized via `font-size`. Use a `text-<size>` utility (backed by the `--ws-font-size-*` tokens) to keep them on the type scale.',
      },
      source: {
        code: SIZE_EXAMPLES.map(({ cls }) => `<RiFlashlightFill className="${cls}" />`).join('\n'),
      },
    },
  },
  render: () => (
    <div className="text-ws-static-strong gap-ws-6 flex items-end">
      {SIZE_EXAMPLES.map(({ cls, label }) => (
        <div key={label} className="gap-ws-2 flex flex-col items-center">
          <RiFlashlightFill className={cls} />
          <span className="text-ws-static-subtle text-xs">{label}</span>
        </div>
      ))}
    </div>
  ),
};

const COLOR_EXAMPLES = [
  { label: 'strong', cls: 'text-ws-static-strong' },
  { label: 'subtle', cls: 'text-ws-static-subtle' },
  { label: 'red', cls: 'text-[#e5484d]' },
  { label: 'green', cls: 'text-[#30a46c]' },
];

export const Coloring: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Icons render `fill="currentColor"`, so they take the surrounding text `color`. You can also apply a text-color utility **directly on the icon** (e.g. `text-ws-static-strong` or `text-[#e5484d]`) — no wrapper element needed.',
      },
      source: {
        code: COLOR_EXAMPLES.map(({ cls }) => `<RiFlashlightFill className="${cls}" />`).join('\n'),
      },
    },
  },
  render: () => (
    <div className="gap-ws-6 flex items-center">
      {COLOR_EXAMPLES.map(({ label, cls }) => (
        <div key={label} className="gap-ws-2 flex flex-col items-center">
          <RiFlashlightFill className={`${cls} text-ws-700`} />
          <span className="text-ws-static-subtle text-xs">{label}</span>
        </div>
      ))}
    </div>
  ),
};

// TypeScript matches icon props structurally (RemixiconComponentType), so any
// component accepting `className` passes — brand assets don't have to come
// from Remix. Demonstrates the two requirements to behave like a Remix icon:
// width/height="1em" (the `.remixicon` 1em reset only targets that class) and
// fill="currentColor" (so it follows the surrounding text colour).
const BrandMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="M12 2 2 7l10 5 10-5-10-5Zm0 7.27L4.24 6 12 2.73 19.76 6 12 9.27ZM2 12l10 5 10-5v5l-10 5-10-5v-5Z" />
  </svg>
);

export const CustomIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Icon props accept any component matching the Remix shape, so brand assets or one-off icons don\'t have to come from Remix — give them `width="1em" height="1em"` and `fill="currentColor"` to size and colour like the rest.',
      },
      source: {
        code: `const BrandMark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" {...props}>
    <path d="…" />
  </svg>
);

<IconButton icon={BrandMark} />`,
      },
    },
  },
  render: () => (
    <div className="text-ws-static-strong gap-ws-2 flex flex-col items-center">
      <BrandMark className="text-ws-800" />
      <span className="text-ws-static-subtle text-xs">custom</span>
    </div>
  ),
};
