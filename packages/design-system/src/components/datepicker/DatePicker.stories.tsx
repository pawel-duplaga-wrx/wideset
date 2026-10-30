import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import { FormField } from '../form-field/FormField';
import { DatePicker } from './DatePicker';
import type { DatePickerProps } from './DatePicker.types';
import PresetsExample from './examples/date-picker/presets';
import presetsSource from './examples/date-picker/presets?raw';
import SizesExample from './examples/date-picker/sizes';
import sizesSource from './examples/date-picker/sizes?raw';
import StatesExample from './examples/date-picker/states';
import statesSource from './examples/date-picker/states?raw';
import VariantsExample from './examples/date-picker/variants';
import variantsSource from './examples/date-picker/variants?raw';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: `DatePicker is a single-date input that pairs a text-style trigger with a calendar popover.
Use it when the user needs to enter a precise calendar date and benefits from a visual month grid — typical use cases include scheduling, filtering by date, and form fields.

This component uses [\`react-day-picker\`](https://daypicker.dev/) and extends its \`PropsBase\` / \`PropsSingle\` interfaces. See the [official documentation](https://daypicker.dev/) for the full reference.

Use DateRangePicker when selecting a span of dates.`,
      },
    },
  },
  argTypes: {
    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    size: {
      description: 'Size of the trigger affecting spacing and typography.',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    preset: {
      description: 'Visual preset of the trigger.',
      control: 'radio',
      options: ['border', 'ghost'],
      table: {
        category: 'Appearance',
        type: { summary: "'border' | 'ghost'" },
        defaultValue: { summary: 'border' },
      },
    },
    variant: {
      description: 'Color variant communicating intent or validation state.',
      control: 'radio',
      options: ['primary', 'danger'],
      table: {
        category: 'Appearance',
        type: { summary: "'primary' | 'danger'" },
        defaultValue: { summary: 'primary' },
      },
    },
    dateFormat: {
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: "'Pick a date'" },
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
    weekStartsOn: {
      description: 'Day the week starts on (0 = Sunday, 1 = Monday, …).',
      control: { type: 'number', min: 0, max: 6 },
      table: {
        category: 'Behavior',
        type: { summary: '0 | 1 | 2 | 3 | 4 | 5 | 6' },
        defaultValue: { summary: '1' },
      },
    },
    onSelect: {
      table: {
        category: 'Events',
        type: { summary: '(day?: string) => void' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    selected: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    disabledDates: {
      control: 'object',
      table: {
        category: 'Behavior',
        type: { summary: 'Matcher | Matcher[]' },
      },
    },
    defaultSelected: {
      control: false,
      table: { category: 'Content', type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

const dateFormats = ['MM.dd.yyyy', 'dd/MM/yyyy', 'MMMM d, yyyy', 'EEE, MMM d'];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default DatePicker with controls active. Use this story to explore size, preset, variant, and behavior props in isolation.',
      },
    },
  },
  render: (args: DatePickerProps) => <DatePicker className="w-72" {...args} />,
  args: {
    size: 'md',
    preset: 'border',
    variant: 'primary',
    placeholder: 'Pick a date',
    disabled: false,
    weekStartsOn: 1,
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Presets: Story = exampleStory(PresetsExample, presetsSource);

export const Sizes: Story = exampleStory(SizesExample, sizesSource);

export const DateFormat: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Control how the selected date is rendered in the trigger with `dateFormat`. It only affects the trigger label — the value passed to `onSelect` is always an ISO `yyyy-MM-dd` string. Defaults to `MM.dd.yyyy`.',
      },
    },
  },
  argTypes: {
    dateFormat: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-4 flex flex-col">
      {dateFormats.map((dateFormat) => (
        <DatePicker
          key={dateFormat}
          {...args}
          className="w-72"
          defaultSelected="2025-08-17"
          dateFormat={dateFormat}
        />
      ))}
    </div>
  ),
  args: Default.args,
};

export const DisabledDates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Mark days as unselectable with `disabledDates`, which accepts a react-day-picker [Matcher](https://daypicker.dev/api/type-aliases/Matcher) (or an array of them). This example blocks weekends via `{ dayOfWeek: [0, 6] }`; other common matchers are `{ before: date }`, `{ after: date }`, and `{ from, to }` ranges. Open the calendar to see the blocked days.',
      },
    },
  },
  render: (args: DatePickerProps) => <DatePicker className="w-72" {...args} />,
  args: {
    ...Default.args,
    defaultSelected: '2025-08-18',
    disabledDates: { dayOfWeek: [0, 6] },
  },
};

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: { story: 'A labeled due-date field with helper text and weekends disabled.' },
    },
  },
  args: { ...Default.args },
  render: (args) => (
    <FormField
      label="Due date"
      htmlFor="due-date"
      helperText="Choose a working day."
      helperTextId="due-date-help"
    >
      <DatePicker
        {...args}
        id="due-date"
        aria-describedby="due-date-help"
        disabledDates={{ dayOfWeek: [0, 6] }}
      />
    </FormField>
  ),
};
