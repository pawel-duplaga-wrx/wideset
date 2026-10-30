import { RiCheckboxCircleFill } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import ColorsExample from './examples/status-badge/colors';
import colorsSource from './examples/status-badge/colors?raw';
import EmphasisExample from './examples/status-badge/emphasis';
import emphasisSource from './examples/status-badge/emphasis?raw';
import IconsExample from './examples/status-badge/icons';
import iconsSource from './examples/status-badge/icons?raw';
import ShapesExample from './examples/status-badge/shapes';
import shapesSource from './examples/status-badge/shapes?raw';
import SizesExample from './examples/status-badge/sizes';
import sizesSource from './examples/status-badge/sizes?raw';
import { StatusBadge } from './StatusBadge';
import type { StatusBadgeProps } from './StatusBadge.types';

const colors: StatusBadgeProps['color'][] = ['negative', 'notice', 'positive', 'info', 'neutral'];

const meta = {
  title: 'Components/StatusBadge',
  tags: ['autodocs'],
  component: StatusBadge,
  subcomponents: {
    'StatusBadge.Icon': StatusBadge.Icon,
  },
  parameters: {
    docs: {
      description: {
        component: `StatusBadge is a small, non-interactive label used to convey status, category, or count at a glance.
Use \`color\` to communicate semantic meaning and \`emphasis\` to control visual weight — \`low\` for subtle, background-level context and \`high\` when the badge needs to stand out.

Use Chip for interactive selection or dismissal.

**Optional Composition:**
\`\`\`
<StatusBadge>           — root, controls color / emphasis / size / shape
  <StatusBadge.Icon>    — optional icon (leading or trailing)
  <StatusBadge.Label>   — text label; use alongside StatusBadge.Icon to apply correct spacings
</StatusBadge>
\`\`\``,
      },
    },
  },
  argTypes: {
    size: {
      description: 'The size of the badge.',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    emphasis: {
      description: 'The visual emphasis of the badge.',
      control: 'radio',
      options: ['low', 'high'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'low' },
        type: { summary: "'low' | 'high'" },
      },
    },
    color: {
      description: 'The color variant of the badge.',
      control: 'select',
      options: colors,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'neutral' },
        type: { summary: "'negative' | 'notice' | 'positive' | 'info' | 'neutral'" },
      },
    },
    shape: {
      description: 'The shape of the badge.',
      control: 'radio',
      options: ['square', 'rounded'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'square' },
        type: { summary: "'square' | 'rounded'" },
      },
    },
    children: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | ReactNode' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default badge with neutral color, medium size, low emphasis, and square shape.',
      },
    },
  },
  render: (args) => <StatusBadge {...args} />,
  args: {
    children: 'Badge',
    size: 'md',
    color: 'neutral',
    emphasis: 'low',
    shape: 'square',
  },
};

export const Colors: Story = exampleStory(ColorsExample, colorsSource);

export const Emphasis: Story = exampleStory(EmphasisExample, emphasisSource);

export const Shapes: Story = exampleStory(ShapesExample, shapesSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const Icons: Story = exampleStory(IconsExample, iconsSource);

export const EmphasisColor: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Color and emphasis work together to control visual weight. Use `low` for informational or background-level badges, and `high` when the badge needs to demand attention. The combination determines how prominent each semantic color appears.',
      },
    },
  },
  argTypes: {
    emphasis: { table: { disable: true } },
    color: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-8 flex flex-col">
      {(['low', 'high'] as const).map((emphasis) => (
        <div key={emphasis} className="gap-ws-6 flex">
          {colors.map((color) => (
            <StatusBadge {...args} key={color} emphasis={emphasis} color={color}>
              {color}
            </StatusBadge>
          ))}
        </div>
      ))}
    </div>
  ),
  args: Default.args,
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'StatusBadge supports icon-only, icon + label, and label + icon layouts using `StatusBadge.Icon` and `StatusBadge.Label`.',
      },
    },
  },
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-16 flex">
      <StatusBadge {...args}>
        <StatusBadge.Icon icon={RiCheckboxCircleFill} />
      </StatusBadge>
      <StatusBadge {...args}>
        <StatusBadge.Icon icon={RiCheckboxCircleFill} />
        <StatusBadge.Label>Label</StatusBadge.Label>
      </StatusBadge>
      <StatusBadge {...args}>
        <StatusBadge.Label>Label</StatusBadge.Label>
        <StatusBadge.Icon icon={RiCheckboxCircleFill} />
      </StatusBadge>
    </div>
  ),
  args: Default.args,
};
