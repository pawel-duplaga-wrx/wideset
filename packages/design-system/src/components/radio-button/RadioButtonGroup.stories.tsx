import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { exampleStory } from '../../stories/example';
import { Button } from '../button/Button';
import OrientationExample from './examples/radio-button-group/orientation';
import orientationSource from './examples/radio-button-group/orientation?raw';
import StatesExample from './examples/radio-button-group/states';
import statesSource from './examples/radio-button-group/states?raw';
import { RadioButton } from './RadioButton';
import type { RadioButtonGroupProps } from './RadioButton.types';
import { RadioButtonGroup } from './RadioButtonGroup';

const orientations: NonNullable<RadioButtonGroupProps['orientation']>[] = [
  'horizontal',
  'vertical',
];

const meta = {
  title: 'Form/RadioButton/RadioButtonGroup',
  tags: ['autodocs'],
  component: RadioButtonGroup,
  parameters: {
    docs: {
      description: {
        component: `RadioButtonGroup coordinates a set of related radio options so users can make exactly one choice.
Use it when options are mutually exclusive and should stay visible together in the same context.

**Typical composition:**
\`\`\`
<RadioButton.Group defaultValue="standard">
  <RadioButton value="standard" label="Standard" />
  <RadioButton value="express" label="Express" />
</RadioButton.Group>
\`\`\`

Use Checkbox.Group when several options can be selected.`,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: orientations,
      table: {
        category: 'Appearance',
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'vertical'" },
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    value: {
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
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
    required: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onValueChange: {
      table: {
        category: 'Events',
        type: { summary: '(value: string) => void' },
      },
    },
    defaultValue: {
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    asChild: {
      description:
        'Renders the group through a passed child element instead of the default root element.',
      control: false,
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
    dir: {
      description:
        'Text direction used for keyboard navigation and layout behavior within the group.',
      control: false,
      table: { category: 'Behavior', type: { summary: "'ltr' | 'rtl'" } },
    },
    loop: {
      description: 'When enabled, keyboard navigation wraps from the last radio back to the first.',
      control: false,
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
  },
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal uncontrolled example with a default selected option and the standard vertical layout.',
      },
    },
  },
  render: (args) => (
    <RadioButton.Group {...args}>
      <RadioButton value="option1" label="Option 1" description="Description of option 1" />
      <RadioButton value="option2" label="Option 2" description="Description of option 2" />
      <RadioButton value="option3" label="Option 3" description="Description of option 3" />
    </RadioButton.Group>
  ),
  args: {
    orientation: 'vertical',
    defaultValue: 'option1',
    disabled: false,
    required: false,
    name: 'radio-group-example',
  },
};

export const Orientation: Story = exampleStory(OrientationExample, orientationSource);

export const Orientations: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use `vertical` for stacked form layouts and `horizontal` when options are short and need to sit inline in a tighter space.',
      },
    },
  },
  argTypes: {
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    orientation: { table: { disable: true } },
  },
  render: ({ defaultValue, disabled, name, required }) => (
    <div className="gap-ws-20 flex flex-wrap">
      {orientations.map((orientation) => (
        <RadioButton.Group
          key={orientation}
          orientation={orientation}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          name={name ? `${name}-${orientation}` : undefined}
        >
          <RadioButton value="option1" label="Option 1" description="Description of option 1" />
          <RadioButton value="option2" label="Option 2" description="Description of option 2" />
          <RadioButton value="option3" label="Option 3" description="Description of option 3" />
        </RadioButton.Group>
      ))}
    </div>
  ),
  args: Default.args,
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Provide `value` and `onValueChange` when a parent component needs to own the selected option.',
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
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  render: function Render({ onValueChange, disabled, name, orientation, required }) {
    const [value, setValue] = useState('option1');

    return (
      <div className="gap-ws-8 flex flex-row items-center justify-between">
        <RadioButton.Group
          orientation={orientation}
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue);
            onValueChange?.(nextValue);
          }}
          disabled={disabled}
          required={required}
          name={name}
        >
          <RadioButton value="option1" label="Option 1" description="Selected by default" />
          <RadioButton value="option2" label="Option 2" description="Use the button to switch" />
        </RadioButton.Group>
        <Button onClick={() => setValue(value === 'option1' ? 'option2' : 'option1')}>
          Toggle
        </Button>
      </div>
    );
  },
  args: Default.args,
};
