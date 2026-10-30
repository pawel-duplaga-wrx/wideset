import { RiCheckLine, RiCloseLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import { Chip } from './Chip';
import type { ChipProps } from './Chip.types';
import IconsExample from './examples/chip/icons';
import iconsSource from './examples/chip/icons?raw';
import SizesExample from './examples/chip/sizes';
import sizesSource from './examples/chip/sizes?raw';
import StatesExample from './examples/chip/states';
import statesSource from './examples/chip/states?raw';
import StylesExample from './examples/chip/styles';
import stylesSource from './examples/chip/styles?raw';
import VariantsExample from './examples/chip/variants';
import variantsSource from './examples/chip/variants?raw';

const variants: ChipProps['variant'][] = ['primary', 'secondary'];

const styles: ChipProps['style'][] = ['filled', 'border'];

const sizes: ChipProps['size'][] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Components/Chip',
  tags: ['autodocs'],
  component: Chip,
  subcomponents: {
    'Chip.Icon': Chip.Icon,
  },
  parameters: {
    docs: {
      description: {
        component: `Chip is a compact interactive label for lightweight actions, selections, and filters.
Use it when users need to scan or toggle a short piece of metadata, or dismiss a selected value.
Do not use it for long text, primary actions, or flows that need the richer semantics and affordances of a full button.

**Optional composition:**
- \`Chip\` is the root and controls size, variant, style, and disabled state.
- \`Chip.Icon\` can be placed before or after the label.

Use Tag for descriptive labels and StatusBadge for non-interactive status.`,
      },
    },
  },
  argTypes: {
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    variant: {
      description: 'Visual style of the chip',
      control: 'radio',
      options: variants,
      table: {
        category: 'Appearance',
        type: { summary: "'primary' | 'secondary'" },
        defaultValue: { summary: 'primary' },
      },
    },
    style: {
      description: 'Visual preset style of the chip',
      control: 'radio',
      options: styles,
      table: {
        category: 'Appearance',
        type: { summary: "'filled' | 'border'" },
        defaultValue: { summary: 'filled' },
      },
    },
    size: {
      description: 'Size of the chip affecting spacing and typography',
      control: 'radio',
      options: sizes,
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      description: 'Chip content',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string | ReactNode' },
      },
    },
    className: {
      description: 'Additional CSS classes merged with the chip root',
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Minimal chip example with the default visual settings and active controls.',
      },
    },
  },
  render: ({ children, ...args }) => <Chip {...args}>{children}</Chip>,
  args: {
    children: 'Label',
    variant: 'primary',
    style: 'filled',
    size: 'md',
    disabled: false,
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Styles: Story = exampleStory(StylesExample, stylesSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const Icons: Story = exampleStory(IconsExample, iconsSource);

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A common composition pattern for selected filters or removable tokens: combine the chip root with optional leading and trailing icons to communicate state and available actions.',
      },
    },
  },
  argTypes: {
    variant: { table: { disable: true } },
    style: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-12 flex flex-wrap">
      <Chip {...args} variant="primary" style="filled">
        <Chip.Icon icon={RiCheckLine} />
        Active filter
        <Chip.Icon icon={RiCloseLine} />
      </Chip>
      <Chip {...args} variant="secondary" style="border">
        <Chip.Icon icon={RiCheckLine} />
        Saved view
      </Chip>
      <Chip {...args} variant="secondary" style="filled">
        Team access
        <Chip.Icon icon={RiCloseLine} />
      </Chip>
    </div>
  ),
  args: Default.args,
};
