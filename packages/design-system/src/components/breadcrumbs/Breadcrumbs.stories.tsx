import { RiAlertFill, RiCalendarLine, RiInformationFill } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbsDivider } from './BreadcrumbsDivider';
import { BreadcrumbsItem } from './BreadcrumbsItem';
import IconsExample from './examples/breadcrumbs/icons';
import iconsSource from './examples/breadcrumbs/icons?raw';
import SeparatorsExample from './examples/breadcrumbs/separators';
import separatorsSource from './examples/breadcrumbs/separators?raw';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  subcomponents: {
    'Breadcrumbs.Item': BreadcrumbsItem,
    'Breadcrumbs.Divider': BreadcrumbsDivider,
  },
  parameters: {
    docs: {
      description: {
        component: `Breadcrumbs shows the user's current location within a page hierarchy. Renders as a \`<nav aria-label="Breadcrumb">\`. The last item is automatically marked as \`aria-current="page"\` and visually disabled — no manual setup required.

Use the \`separator\` prop for built-in separators, or omit it and place \`Breadcrumbs.Divider\` manually for full layout control.

Use Tabs to switch between sibling sections rather than hierarchical locations.

**Composition:**
\`\`\`
<Breadcrumbs separator="arrow">   — wrapper (<nav>); injects dividers and marks the last item
  <Breadcrumbs.Item>              — individual crumb; renders a <button> by default, use asChild to render a link
  <Breadcrumbs.Divider>           — separator between items; auto-placed when separator prop is set, or placed manually when omitted
</Breadcrumbs>
\`\`\``,
      },
    },
  },
  argTypes: {
    separator: {
      control: 'radio',
      options: ['slash', 'arrow', undefined],
      table: {
        category: 'Appearance',
        type: { summary: "'slash' | 'arrow' | undefined" },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      description: 'One or more `Breadcrumbs.Item` / `Breadcrumbs.Divider` nodes.',
      control: false,
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumbs with an arrow separator. The last item is automatically marked as disabled. Icons inside items should use size `9` (16px) per design guidelines.',
      },
    },
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item>
        <RiInformationFill className="h-ws-9 w-ws-9" />
        Page 1
      </Breadcrumbs.Item>
      <Breadcrumbs.Item>Page 2</Breadcrumbs.Item>
      <Breadcrumbs.Item>Page 3</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
  args: {
    separator: 'arrow',
  },
};

export const Separators: Story = exampleStory(SeparatorsExample, separatorsSource);

export const Icons: Story = exampleStory(IconsExample, iconsSource);

export const WithRoutingLinks: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `asChild` on `Breadcrumbs.Item` to render a custom link.',
      },
    },
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item asChild>
        <a href="/" className="gap-ws-4 flex items-center">
          <RiAlertFill className="h-ws-9 w-ws-9" />
          Page 1
        </a>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item asChild>
        <a href="/" className="gap-ws-4 flex items-center" aria-label="Page 2">
          <RiInformationFill className="h-ws-9 w-ws-9" />
        </a>
      </Breadcrumbs.Item>
      <Breadcrumbs.Item asChild>
        <a href="/" className="gap-ws-4 flex items-center">
          <RiCalendarLine className="h-ws-9 w-ws-9" />
          Page 3
        </a>
      </Breadcrumbs.Item>
    </Breadcrumbs>
  ),
  args: Default.args,
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Omit `separator` and place `Breadcrumbs.Divider` manually for full control over separators and their position.',
      },
    },
  },
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumbs.Item>Page 1</Breadcrumbs.Item>
      <Breadcrumbs.Divider>→</Breadcrumbs.Divider>
      <Breadcrumbs.Item>Page 2</Breadcrumbs.Item>
      <Breadcrumbs.Divider>→</Breadcrumbs.Divider>
      <Breadcrumbs.Item>Page 3</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
  args: {
    ...Default.args,
    separator: undefined,
  },
};
