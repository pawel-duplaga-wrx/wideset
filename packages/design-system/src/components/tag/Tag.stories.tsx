import { RiFlashlightFill } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import ColorsExample from './examples/tag/colors';
import colorsSource from './examples/tag/colors?raw';
import IconsExample from './examples/tag/icons';
import iconsSource from './examples/tag/icons?raw';
import PresetsExample from './examples/tag/presets';
import presetsSource from './examples/tag/presets?raw';
import ShapesExample from './examples/tag/shapes';
import shapesSource from './examples/tag/shapes?raw';
import SizesExample from './examples/tag/sizes';
import sizesSource from './examples/tag/sizes?raw';
import { Tag } from './Tag';
import type { TagProps } from './Tag.types';

const colors: TagProps['color'][] = [
  'brand',
  'red',
  'pink',
  'violet',
  'purple',
  'indigo',
  'blue',
  'cyan',
  'teal',
  'green',
  'lime',
  'yellow',
  'orange',
  'secondary',
];

const sizes: TagProps['size'][] = ['sm', 'md', 'lg'];

const presets: TagProps['preset'][] = ['filled', 'border'];

const meta = {
  title: 'Components/Tag',
  tags: ['autodocs'],
  component: Tag,
  subcomponents: {
    'Tag.Icon': Tag.Icon,
  },
  parameters: {
    docs: {
      description: {
        component: `Tag is a compact label used to categorize, classify, or annotate content with color-coded visual styles.
Use \`color\` to convey categorical meaning, \`preset\` to control the visual style, and \`shape\` to adjust the shape.

Use Chip for interactive labels and StatusBadge for semantic state.

**Optional Composition:**
\`\`\`
<Tag>        — root, controls color / preset / size / shape
  <Tag.Icon> — optional leading icon
</Tag>
\`\`\``,
      },
    },
  },
  argTypes: {
    size: {
      description: 'The size of the tag.',
      control: 'radio',
      options: sizes,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    preset: {
      description: 'The visual preset style of the tag.',
      control: 'radio',
      options: presets,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'filled' },
        type: { summary: "'filled' | 'border'" },
      },
    },
    color: {
      description: 'The color variant of the tag.',
      control: 'select',
      options: colors,
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'brand' },
        type: { summary: colors.map((color) => `'${color}'`).join(' | ') },
      },
    },
    shape: {
      description: 'The shape of the tag.',
      control: 'radio',
      options: ['square', 'rounded'],
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'square' },
        type: { summary: "'square' | 'rounded'" },
      },
    },
    iconOnly: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    truncate: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    children: {
      description: 'The content of the tag.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | ReactNode' },
      },
    },
    className: {
      description: 'Additional CSS classes to apply to the tag.',
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default tag with brand color, medium size, filled preset, and square corners.',
      },
    },
  },
  render: (args) => <Tag {...args} />,
  args: {
    children: 'Label',
    color: 'brand',
    preset: 'filled',
    size: 'md',
    shape: 'square',
    truncate: false,
  },
};

export const Colors: Story = exampleStory(ColorsExample, colorsSource);

export const Presets: Story = exampleStory(PresetsExample, presetsSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const Shapes: Story = exampleStory(ShapesExample, shapesSource);

export const Icons: Story = exampleStory(IconsExample, iconsSource);

export const ColorPreset: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Color and preset work together to control the visual style. `filled` gives each color a solid background, while `border` applies a subtle outline. Both are available across all color variants.',
      },
      source: {
        code: `<div className="flex flex-col gap-ws-8">
  <div className="flex flex-wrap gap-ws-4">
    <Tag color="brand" preset="filled">brand</Tag>
    <Tag color="red" preset="filled">red</Tag>
    {/* …each \`color\` with preset="filled", then the same colors with preset="border" */}
  </div>
</div>`,
      },
    },
  },
  argTypes: {
    color: { table: { disable: true } },
    preset: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-8 flex flex-col">
      {(['filled', 'border'] as const).map((preset) => (
        <div key={preset} className="gap-ws-4 flex flex-wrap">
          {colors.map((color) => (
            <Tag {...args} key={color} color={color} preset={preset}>
              {color}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
  args: Default.args,
};

export const Truncate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Enable `truncate` to clip overflowing text with an ellipsis when the tag is constrained by its container width.',
      },
      source: {
        code: `<div className="w-48 space-y-ws-4">
  <Tag truncate={false}>Not truncated - this text should be fully visible</Tag>
  <Tag truncate={true}>Truncated - this text should be truncated</Tag>
</div>`,
      },
    },
  },
  argTypes: {
    truncate: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <div className="space-y-ws-4 w-48">
      <Tag {...args} truncate={false}>
        Not truncated - this text should be fully visible
      </Tag>
      <Tag {...args} truncate={true}>
        Truncated - this text should be truncated
      </Tag>
    </div>
  ),
  args: Default.args,
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tag supports a leading icon via `Tag.Icon`. Use `iconOnly` for an icon-only variant with equal padding on all sides.',
      },
      source: {
        code: `import { RiFlashlightFill } from '@remixicon/react';

<div className="flex gap-ws-4">
  <Tag>
    <Tag.Icon icon={RiFlashlightFill} />
    Label
  </Tag>
  <Tag iconOnly>
    <Tag.Icon icon={RiFlashlightFill} />
  </Tag>
</div>`,
      },
    },
  },
  argTypes: {
    children: { table: { disable: true } },
    iconOnly: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-4 flex">
      <Tag {...args}>
        <Tag.Icon icon={RiFlashlightFill} />
        Label
      </Tag>
      <Tag {...args} iconOnly>
        <Tag.Icon icon={RiFlashlightFill} />
      </Tag>
    </div>
  ),
  args: Default.args,
};
