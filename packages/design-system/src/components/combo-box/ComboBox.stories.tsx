import { RiCalendarLine, RiFolderLine } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { exampleStory } from '../../stories/example';
import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';
import { ComboBox } from './ComboBox';
import type { ComboBoxOption } from './ComboBox.types';
import { ComboBoxItem } from './ComboBoxItem';
import { ComboBoxTrigger } from './ComboBoxTrigger';
import IconsExample from './examples/combo-box/icons';
import iconsSource from './examples/combo-box/icons?raw';
import PresetsExample from './examples/combo-box/presets';
import presetsSource from './examples/combo-box/presets?raw';
import SizesExample from './examples/combo-box/sizes';
import sizesSource from './examples/combo-box/sizes?raw';
import StatesExample from './examples/combo-box/states';
import statesSource from './examples/combo-box/states?raw';
import VariantsExample from './examples/combo-box/variants';
import variantsSource from './examples/combo-box/variants?raw';

const sizes = ['sm', 'md', 'lg'] as const;

const sampleOptions: ComboBoxOption[] = [
  { label: 'Poland', value: 'poland' },
  { label: 'USA', value: 'usa' },
  { label: 'Germany', value: 'germany' },
  { label: 'Canada', value: 'canada', disabled: true },
  { label: 'UK', value: 'uk', variant: 'danger' },
];

const meta = {
  title: 'Form/ComboBox',
  tags: ['autodocs'],
  component: ComboBox,
  subcomponents: { 'ComboBox.Trigger': ComboBoxTrigger, 'ComboBox.Item': ComboBoxItem },
  parameters: {
    docs: {
      description: {
        component: `ComboBox combines a text input with a filtered option list. Pick an option or type a custom value. Use \`disallowCustomValue\` to constrain input to existing options.

Use Select when users must choose an existing value without entering custom text.

**Composition:** ComboBox works standalone via the \`options\` prop, or you can compose the trigger and content for full rendering control:

\`\`\`tsx
<ComboBox options={options} value={value} onChange={setValue}>
  <ComboBox.Trigger placeholder="Select country" /> {/* the input + selected value */}
  <ComboBox.Content>
    {(option) => <ComboBox.Item value={option.value} />} {/* one row per option */}
  </ComboBox.Content>
</ComboBox>
\`\`\``,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    clearSelectionAriaLabel: { table: { category: 'Content', type: { summary: 'string' } } },
    variant: {
      control: 'radio',
      options: ['primary', 'danger'],
      table: {
        category: 'Appearance',
        type: { summary: 'primary | danger' },
        defaultValue: { summary: 'primary' },
      },
    },
    preset: {
      control: 'radio',
      options: ['border', 'ghost'],
      table: {
        category: 'Appearance',
        type: { summary: 'border | ghost' },
        defaultValue: { summary: 'border' },
      },
    },
    size: {
      control: 'radio',
      options: sizes,
      table: {
        category: 'Appearance',
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    className: {
      control: 'text',
      table: { category: 'Appearance', type: { summary: 'string' } },
    },
    options: {
      control: 'object',
      table: {
        category: 'Content',
        type: { summary: '{ value: string; label: string; disabled?: boolean }[]' },
      },
    },
    placeholder: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    value: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    defaultValue: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    children: {
      control: false,
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disallowCustomValue: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      table: { category: 'Events', type: { summary: '(value: string) => void' } },
    },
    onClear: {
      table: { category: 'Events', type: { summary: '() => void' } },
    },
  },
} satisfies Meta<typeof ComboBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select country',
    size: 'md',
    preset: 'border',
    variant: 'primary',
    clearable: false,
    disabled: false,
    disallowCustomValue: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal working example with active controls. By default custom values are allowed — type to filter, pick an option, or commit free text.',
      },
    },
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Presets: Story = exampleStory(PresetsExample, presetsSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const Icons: Story = exampleStory(IconsExample, iconsSource);

export const Clearable: Story = {
  args: {
    ...Default.args,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'With `clearable`, an X button appears whenever a value is selected or text is typed, resetting the value and firing `onChange("")` plus `onClear`.',
      },
    },
  },
};

export const Controlled: Story = {
  argTypes: { value: { control: false } },
  render: function Render(args) {
    const [value, setValue] = useState(sampleOptions[0].value);

    return (
      <div className="gap-ws-4 flex flex-col">
        <ComboBox
          {...args}
          className="w-72"
          options={sampleOptions}
          placeholder="Select country"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            args.onChange?.(nextValue);
          }}
        />
        <div className="gap-ws-2 flex">
          <Button onClick={() => setValue('germany')} size="sm">
            Set to Germany
          </Button>
          <Button onClick={() => setValue('poland')} size="sm">
            Set to Poland
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled usage: pass `value` and update it from `onChange`. External writes (the buttons here) are reflected immediately, so the parent owns the source of truth.',
      },
    },
  },
};

export const CustomValue: Story = {
  argTypes: { value: { control: false } },
  render: function Render(args) {
    const [value, setValue] = useState('poland');

    return (
      <div className="gap-ws-4 flex flex-col">
        <ComboBox
          {...args}
          className="w-72"
          options={sampleOptions}
          placeholder="Type or select"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            args.onChange?.(nextValue);
          }}
        />
        <div className="gap-ws-2 flex">
          <Button onClick={() => setValue('poland')} size="sm">
            Set to Poland
          </Button>
          <Button onClick={() => setValue('Widelabland')} size="sm">
            Set custom value
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'In the default mode (custom values allowed), typed text that matches no option is committed as the value on Enter or blur. Use this for free-text-with-suggestions fields like tags or URLs.',
      },
    },
  },
};

export const OptionsWithPrefix: Story = {
  argTypes: { value: { control: false } },
  render: function Render(args) {
    const [value, setValue] = useState('');

    const prefixOptions: ComboBoxOption[] = [
      {
        label: 'widelab.co',
        value: 'text',
        prefix: <span className="text-ws-static-strong typography-label-sm">https://</span>,
      },
      {
        label: 'Calendar Events',
        value: 'calendar',
        prefix: <RiCalendarLine className="text-ws-dynamic-secondary-default size-ws-8" />,
      },
      {
        label: 'Project Files',
        value: 'files',
        prefix: <RiFolderLine className="text-ws-dynamic-secondary-default size-ws-8" />,
      },
      {
        label: 'John Doe',
        value: 'user',
        prefix: (
          <Avatar
            size="xs"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            initials="JD"
          />
        ),
      },
    ];

    return (
      <div className="gap-ws-8 flex flex-col">
        {sizes.map((size) => (
          <ComboBox
            {...args}
            key={size}
            className="w-72"
            size={size}
            placeholder={`Choose repository (${size})`}
            options={prefixOptions}
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
              args.onChange?.(nextValue);
            }}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Each option can carry a `prefix` node (icon, avatar, or text). The selected option’s prefix is mirrored in the trigger. Useful for entity pickers where a glyph aids recognition.',
      },
    },
  },
};

export const WithScroll: Story = {
  render: function Render() {
    const manyOptions = Array.from({ length: 30 }, (_, index) => ({
      value: `option-${index + 1}`,
      label: `Option ${index + 1}`,
    }));

    return <ComboBox className="w-72" options={manyOptions} placeholder="Type or select" />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'With many options the dropdown becomes scrollable while keeping a capped max height. Typing filters the list, which is the primary way to reach far-down options.',
      },
    },
  },
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  argTypes: { value: { control: false } },
  render: function Render(args) {
    const [value, setValue] = useState('poland');

    return (
      <ComboBox
        {...args}
        options={sampleOptions}
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
          args.onChange?.(nextValue);
        }}
      >
        <ComboBox.Trigger
          className="w-72"
          size="md"
          preset="border"
          variant="primary"
          placeholder="Select country"
        />
        <ComboBox.Content>{(option) => <ComboBox.Item value={option.value} />}</ComboBox.Content>
      </ComboBox>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Composed usage: render `ComboBox.Trigger` and `ComboBox.Content` yourself for full control over the trigger layout and per-option rendering, while the parent `ComboBox` still owns state and filtering.',
      },
    },
  },
};
