import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { exampleStory } from '../../stories/example';
import FormatsExample from './examples/timepicker/formats';
import formatsSource from './examples/timepicker/formats?raw';
import PresetsExample from './examples/timepicker/presets';
import presetsSource from './examples/timepicker/presets?raw';
import SizesExample from './examples/timepicker/sizes';
import sizesSource from './examples/timepicker/sizes?raw';
import StatesExample from './examples/timepicker/states';
import statesSource from './examples/timepicker/states?raw';
import VariantsExample from './examples/timepicker/variants';
import variantsSource from './examples/timepicker/variants?raw';
import { TimePicker } from './Timepicker';
import type { TimePickerProps } from './Timepicker.types';

const meta = {
  parameters: {
    docs: {
      description: {
        component:
          'TimePicker lets users select a time from a list of generated options. Use it for scheduling within a bounded time interval. Use DatePicker for calendar dates.',
      },
    },
  },
  title: 'Form/TimePicker',
  tags: ['autodocs'],
  component: TimePicker,
  argTypes: {
    className: {
      description:
        'Additional CSS classes applied to the trigger element. Width utilities (e.g. `w-[20rem]`) override the default width.',
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    id: {
      description:
        'HTML `id` attribute for the trigger element, useful for form label association.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    children: {
      description:
        'Custom Select subcomponents for a composed time picker. Use for grouped options or a custom option layout.',
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    defaultMotion: {
      control: 'boolean',
      description:
        "Turns the component's built-in animations on or off. When omitted, inherits the value from the nearest `MotionProvider`.",
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
    size: {
      description: 'Controls the height, padding, and typography size of the trigger.',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    name: {
      description: 'HTML `name` attribute forwarded for form submission.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    variant: {
      description: 'Color variant. `danger` applies error styling for form validation feedback.',
      control: 'radio',
      options: ['primary', 'danger'],
      table: {
        category: 'Appearance',
        type: { summary: 'primary | danger' },
        defaultValue: { summary: 'primary' },
      },
    },
    preset: {
      description:
        'Visual style preset. `border` adds a visible border and background; `ghost` uses a transparent background.',
      control: 'radio',
      options: ['border', 'ghost'],
      table: {
        category: 'Appearance',
        type: { summary: 'border | ghost' },
        defaultValue: { summary: 'border' },
      },
    },
    onClear: {
      description:
        'Called when the clear button is clicked. Use for custom reset logic beyond clearing the value.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    hideArrow: {
      description: 'Whether to hide the dropdown arrow icon on the right side of the trigger.',
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      description: 'Whether to show a clear button in the trigger when a value is selected.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hasSearch: {
      description:
        'Whether to show a search input at the top of the dropdown that filters options by label.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    clearSelectionAriaLabel: {
      description:
        "Accessible label for the clear-selection button. Defaults to `'Clear selection'`.",
      table: { category: 'Content', type: { summary: 'string' } },
    },
    defaultValue: {
      description:
        'Initial value for uncontrolled select. Sets the default selected option on first render.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      description:
        'Callback fired when user selects an option. Receives the selected option value as parameter.',
      table: {
        category: 'Events',
        type: { summary: '(value: string) => void' },
      },
    },
    open: {
      description:
        'Controlled open state of the dropdown. Use with `onOpenChange` to manage open/close externally.',
      control: false,
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      description: 'Initial open state for uncontrolled usage.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      description:
        'Callback fired when dropdown opens or closes. Receives boolean indicating open state.',
      table: {
        category: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },
    required: {
      description: 'Marks the select as required in a form context.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    mode: { table: { category: 'Behavior', type: { summary: 'union' } } },
    format: {
      control: 'radio',
      options: ['12h', '24h'],
      table: {
        category: 'Behavior',
        type: { summary: '12h | 24h' },
        defaultValue: { summary: '24h' },
      },
    },
    min: {
      control: 'text',
      table: { category: 'Behavior', type: { summary: 'string' } },
    },
    max: {
      control: 'text',
      table: { category: 'Behavior', type: { summary: 'string' } },
    },
    intervalInMinutes: {
      control: 'number',
      table: { category: 'Behavior', type: { summary: 'number' }, defaultValue: { summary: '15' } },
    },
    placeholder: {
      description: 'Text shown before a time is selected. Defaults to `Time`.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'Time' },
      },
    },
    value: {
      description: 'Currently selected time value in HH:mm format (e.g. "09:30").',
      control: 'text',
      table: { category: 'Behavior', type: { summary: 'string' } },
    },
    disabled: {
      description: 'Disables the time picker interaction.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof TimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: 'Minimal example with editable controls.' } } },
  render: (args: TimePickerProps) => <TimePicker {...args} />,
  args: {
    placeholder: 'Pick time',
    format: '24h',
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Presets: Story = exampleStory(PresetsExample, presetsSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const Formats: Story = exampleStory(FormatsExample, formatsSource);

export const Intervals: Story = {
  parameters: { docs: { description: { story: 'Limits the available time options.' } } },
  render: (args: TimePickerProps) => <TimePicker {...args} />,
  args: {
    min: '08:00',
    max: '16:00',
    intervalInMinutes: 30,
    placeholder: 'Pick time',
  },
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  parameters: { docs: { description: { story: 'Composes start and end time controls.' } } },
  render: function Render() {
    const [from, setFrom] = useState<string | undefined>();
    const [to, setTo] = useState<string | undefined>();

    return (
      <div className="gap-ws-8 inline-flex items-center">
        <div>
          <p className="typography-body-sm text-ws-static-subtle">From</p>
          <TimePicker
            mode="from"
            min="08:00"
            max="18:00"
            intervalInMinutes={30}
            placeholder="From"
            value={from}
            onValueChange={(value) => {
              setFrom(value);
              if (to && value >= to) setTo(undefined);
            }}
          />
        </div>
        <div>
          <p className="typography-body-sm text-ws-static-subtle">To</p>
          <TimePicker
            mode="to"
            min={from ?? '08:00'}
            max="18:00"
            intervalInMinutes={30}
            placeholder="To"
            value={to}
            onValueChange={setTo}
            disabled={!from}
          />
        </div>
      </div>
    );
  },
};
