import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { exampleStory } from '../../stories/example';
import { Button } from '../button/Button';
import SizesExample from './examples/radio-button/sizes';
import sizesSource from './examples/radio-button/sizes?raw';
import StatesExample from './examples/radio-button/states';
import statesSource from './examples/radio-button/states?raw';
import VariantsExample from './examples/radio-button/variants';
import variantsSource from './examples/radio-button/variants?raw';
import { RadioButton } from './RadioButton';
import type { RadioButtonProps } from './RadioButton.types';

const variants: NonNullable<RadioButtonProps['variant']>[] = ['primary', 'danger'];

const sizes: NonNullable<RadioButtonProps['size']>[] = ['lg', 'sm'];

type RadioButtonAppearanceArgs = {
  size: NonNullable<RadioButtonProps['size']>;
  variant: NonNullable<RadioButtonProps['variant']>;
  disabled: boolean;
  required: boolean;
};

const radioAppearanceArgs: RadioButtonAppearanceArgs = {
  size: 'lg',
  variant: 'primary',
  disabled: false,
  required: false,
};

const radioValueArgs = {
  ...radioAppearanceArgs,
  value: 'option1',
};

const defaultRadioButtonArgs = {
  ...radioValueArgs,
  label: 'Option 1',
};

const radioWithDescriptionArgs = {
  ...radioValueArgs,
  label: 'Label',
  description: 'This is description',
};

const meta = {
  title: 'Form/RadioButton/RadioButton',
  tags: ['autodocs'],
  component: RadioButton,
  subcomponents: {
    'RadioButton.Group': RadioButton.Group,
  },
  parameters: {
    docs: {
      description: {
        component: `RadioButton represents a single option inside a mutually exclusive set managed by RadioButton.Group.
Use it when users need to choose exactly one option from a short, visible list.
Prefer the shorthand \`label\` and \`description\` props for the common case, or compose with \`RadioButton.Label\` and \`RadioButton.Description\` when you need custom markup.

**Typical composition:**
\`\`\`
  <RadioButton value="standard" label="Standard" />
  <RadioButton value="express">
    <RadioButton.Label>Express</RadioButton.Label>
    <RadioButton.Description>Delivered next business day.</RadioButton.Description>
  </RadioButton>
\`\`\`

Use Checkbox for independent selections and Select for a long list of options.`,
      },
    },
  },
  argTypes: {
    defaultMotion: {
      control: 'boolean',
      description:
        "Turns the component's built-in animations on or off. When omitted, inherits the value from the nearest `MotionProvider`.",
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
    size: {
      control: 'radio',
      description: 'The size of the radio button.',
      options: sizes,
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'lg'" },
        defaultValue: { summary: "'lg'" },
      },
    },
    variant: {
      control: 'radio',
      description: 'The visual style variant of the radio button.',
      options: variants,
      table: {
        category: 'Appearance',
        type: { summary: "'primary' | 'danger'" },
        defaultValue: { summary: "'primary'" },
      },
    },
    label: {
      description: 'Shorthand label, mutually exclusive with composed children.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    description: {
      description: 'Supporting text. Requires `label`; unavailable with composed `children`.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      description:
        'Composed label and description. Use instead of the shorthand label and description.',
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    disabled: {
      description: 'Disables the radio visually and functionally.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    id: {
      description: 'Stable id of the radio input. When omitted, one is generated automatically.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    required: {
      description: 'Marks the radio as required in a form context.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      description: 'Unique value of the radio within the owning `RadioButton.Group`.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    className: {
      description: 'Additional CSS classes merged with the radio root element.',
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    asChild: {
      description:
        'Renders the radio through a passed child element instead of the default root element.',
      control: false,
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal working example using the shorthand `label` prop. The radio is wrapped in `RadioButton.Group` because selection state is owned by the group.',
      },
    },
  },
  render: (args) => (
    <RadioButton.Group defaultValue={args.value}>
      <RadioButton {...args} />
    </RadioButton.Group>
  ),
  args: defaultRadioButtonArgs,
};

export const Variants: Story = {
  ...exampleStory(VariantsExample, variantsSource),
  args: { value: 'annual' },
};

export const Sizes: Story = {
  ...exampleStory(SizesExample, sizesSource),
  args: { value: 'annual' },
};

export const WithLabelAndDescription: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the shorthand `label` and `description` props for the most common one-line radio option pattern. The component handles the input-to-label association automatically.',
      },
    },
  },
  render: (args) => (
    <RadioButton.Group defaultValue={args.value}>
      <RadioButton {...args} />
    </RadioButton.Group>
  ),
  args: radioWithDescriptionArgs,
};

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Control selection from a parent component by passing `value` and `onValueChange` to `RadioButton.Group`.',
      },
      source: {
        code: `
const [value, setValue] = useState('option1');

<RadioButton.Group value={value} onValueChange={setValue}>
  <RadioButton value="option1" label="Option 1" />
  <RadioButton value="option2" label="Option 2" />
</RadioButton.Group>
        `.trim(),
      },
    },
  },
  argTypes: {
    label: { table: { category: 'Content' }, control: false },
    description: { table: { category: 'Content' }, control: false },
    children: { table: { category: 'Content' }, control: false },
    id: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  render: function Render({ disabled, required, size, variant }) {
    const [value, setValue] = useState<string>('option1');

    return (
      <div className="gap-ws-8 flex flex-row items-center justify-between">
        <RadioButton.Group value={value} onValueChange={setValue}>
          <RadioButton
            size={size}
            variant={variant}
            disabled={disabled}
            required={required}
            value="option1"
            label="Option 1"
            description="Selected by default"
          />
          <RadioButton
            size={size}
            variant={variant}
            disabled={disabled}
            required={required}
            value="option2"
            label="Option 2"
            description="Use the button to switch programmatically"
          />
        </RadioButton.Group>
        <Button onClick={() => setValue(value === 'option1' ? 'option2' : 'option1')}>
          Toggle
        </Button>
      </div>
    );
  },
  args: radioValueArgs,
};

export const States: Story = {
  ...exampleStory(StatesExample, statesSource),
  args: { value: 'annual' },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `RadioButton.Label` and `RadioButton.Description` when you need full control over the label markup while keeping the composed content linked to the radio through context.',
      },
      source: {
        code: `
<RadioButton.Group defaultValue="team-a">
  <RadioButton value="team-a" id="radio-team-a">
    <RadioButton.Label htmlFor="radio-team-a">Team A</RadioButton.Label>
    <RadioButton.Description>Default workspace for daily operations.</RadioButton.Description>
  </RadioButton>
</RadioButton.Group>
        `.trim(),
      },
    },
  },
  argTypes: {
    label: { table: { category: 'Content' }, control: false },
    description: { table: { category: 'Content' }, control: false },
    children: { table: { category: 'Content' }, control: false },
    id: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  render: ({ size, variant, disabled, required }) => (
    <RadioButton.Group defaultValue="team-a">
      <RadioButton
        size={size}
        variant={variant}
        disabled={disabled}
        required={required}
        value="team-a"
        id="radio-team-a"
      >
        <RadioButton.Label htmlFor="radio-team-a">Team A</RadioButton.Label>
        <RadioButton.Description>Default workspace for daily operations.</RadioButton.Description>
      </RadioButton>
      <RadioButton
        size={size}
        variant={variant}
        disabled={disabled}
        required={required}
        value="team-b"
        id="radio-team-b"
      >
        <RadioButton.Label htmlFor="radio-team-b">Team B</RadioButton.Label>
        <RadioButton.Description>
          Use when the project needs elevated visibility.
        </RadioButton.Description>
      </RadioButton>
    </RadioButton.Group>
  ),
  args: radioValueArgs,
};
