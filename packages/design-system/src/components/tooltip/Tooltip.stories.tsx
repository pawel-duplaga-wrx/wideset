import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import { Button } from '../button/Button';
import SizesExample from './examples/tooltip/sizes';
import sizesSource from './examples/tooltip/sizes?raw';
import VariantsExample from './examples/tooltip/variants';
import variantsSource from './examples/tooltip/variants?raw';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  component: Tooltip,
  subcomponents: {
    'Tooltip.Content': Tooltip.Content,
  },
  parameters: {
    docs: {
      description: {
        component: `Tooltip displays contextual information when a user hovers over or focuses a trigger element.

\`Tooltip.Trigger\` accepts any element via the \`asChild\` prop — pass a button, icon, link, or any focusable node.

Use Popup for interactive content and FormField for essential field instructions that must remain visible.

**Composition:**
\`\`\`
<Tooltip>                  — root, controls variant, arrow, and delay
  <Tooltip.Trigger>        — the element that opens the tooltip, can contain any node
  <Tooltip.Content>        — the floating content wrapper
    <Tooltip.Label>        — bold title text
    <Tooltip.Description>  — supporting text
</Tooltip>
\`\`\``,
      },
    },
  },
  argTypes: {
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    children: { control: false, table: { category: 'Content', type: { summary: 'ReactNode' } } },
    variant: {
      control: 'radio',
      options: ['default', 'inverse'],
      table: {
        category: 'Appearance',
        type: { summary: "'default' | 'inverse'" },
        defaultValue: { summary: "'default'" },
      },
    },
    size: {
      control: 'radio',
      options: ['md', 'sm'],
      table: {
        category: 'Appearance',
        type: { summary: "'md' | 'sm'" },
        defaultValue: { summary: "'md'" },
      },
    },
    arrow: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    delayDuration: {
      control: { type: 'number', min: 0, max: 5000, step: 100 },
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground — hover the button, then use the controls panel to change variant, arrow, and delay.',
      },
    },
  },
  render: (args) => (
    <div className="p-ws-20 flex w-full items-center justify-center">
      <Tooltip {...args}>
        <Tooltip.Trigger asChild>
          <Button>Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Label>Lorem ipsum dolor</Tooltip.Label>
          <Tooltip.Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Tooltip.Description>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
  args: {
    variant: 'default',
    size: 'md',
    arrow: true,
    delayDuration: 100,
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const Positions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `side` on `Tooltip.Content` to control which edge the tooltip appears on. Radix automatically flips the tooltip when it would overflow the viewport.',
      },
    },
  },
  render: (args) => (
    <div className="gap-ws-4 p-ws-16 flex w-full items-center justify-center">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} {...args}>
          <Tooltip.Trigger asChild>
            <Button variant="secondary">{side.charAt(0).toUpperCase() + side.slice(1)}</Button>
          </Tooltip.Trigger>
          <Tooltip.Content side={side}>
            <Tooltip.Label>Side: {side}</Tooltip.Label>
          </Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  ),
  args: Default.args,
};

export const Arrow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Arrow is enabled by default and provides a directional cue to the trigger. Disable it for a cleaner look when the trigger position is obvious.',
      },
    },
  },
  argTypes: {
    arrow: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-8 p-ws-16 flex w-full items-center justify-center">
      <Tooltip {...args} arrow>
        <Tooltip.Trigger asChild>
          <Button>With arrow</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Label>Arrow enabled</Tooltip.Label>
        </Tooltip.Content>
      </Tooltip>
      <Tooltip {...args} arrow={false}>
        <Tooltip.Trigger asChild>
          <Button>Without arrow</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Label>Arrow disabled</Tooltip.Label>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
  args: Default.args,
};

export const Delay: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use a short delay (default 100 ms) for tooltips on frequently scanned UI. Increase `delayDuration` for elements where accidental hover is common.',
      },
    },
  },
  argTypes: {
    delayDuration: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-4 p-ws-16 flex w-full items-center justify-center">
      <Tooltip {...args} delayDuration={100}>
        <Tooltip.Trigger asChild>
          <Button>Fast (100 ms)</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Label>Appears quickly</Tooltip.Label>
        </Tooltip.Content>
      </Tooltip>
      <Tooltip {...args} delayDuration={1000}>
        <Tooltip.Trigger asChild>
          <Button>Slow (1 s)</Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Label>Appears after 1 second</Tooltip.Label>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
  args: Default.args,
};

export const MaxWidth: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltips expand to fit content by default. Pass a `max-w-*` className to `Tooltip.Content` to constrain width and wrap longer descriptions.',
      },
    },
  },
  render: (args) => (
    <div className="gap-ws-4 px-ws-16 flex w-full items-center justify-center py-32">
      <Tooltip {...args}>
        <Tooltip.Trigger asChild>
          <Button>Narrow</Button>
        </Tooltip.Trigger>
        <Tooltip.Content className="max-w-48">
          <Tooltip.Label>Short label</Tooltip.Label>
          <Tooltip.Description>
            Maximum width of 12 rem — text wraps at this boundary.
          </Tooltip.Description>
        </Tooltip.Content>
      </Tooltip>
      <Tooltip {...args}>
        <Tooltip.Trigger asChild>
          <Button>Wide</Button>
        </Tooltip.Trigger>
        <Tooltip.Content className="max-w-80">
          <Tooltip.Label>Longer label</Tooltip.Label>
          <Tooltip.Description>
            Maximum width of 20 rem — accommodates longer descriptions while maintaining
            readability.
          </Tooltip.Description>
        </Tooltip.Content>
      </Tooltip>
    </div>
  ),
  args: Default.args,
};

export const Composition: Story = {
  args: Default.args,
  parameters: {
    docs: {
      description: {
        story:
          'Compose a label and description for supplementary help; keep essential instructions visible outside the tooltip.',
      },
    },
  },
  render: (args) => (
    <Tooltip {...args}>
      <Tooltip.Trigger asChild>
        <Button variant="secondary">Storage usage</Button>
      </Tooltip.Trigger>
      <Tooltip.Content className="max-w-[20rem]">
        <Tooltip.Label>Workspace storage</Tooltip.Label>
        <Tooltip.Description>
          Storage is shared by all projects in this workspace.
        </Tooltip.Description>
      </Tooltip.Content>
    </Tooltip>
  ),
};
