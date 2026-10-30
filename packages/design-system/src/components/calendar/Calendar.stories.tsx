import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DateRange, OnSelectHandler } from 'react-day-picker';

import { exampleStory } from '../../stories/example';
import { Calendar } from './Calendar';
import type { CalendarProps } from './Calendar.types';
import ModesExample from './examples/calendar/modes';
import modesSource from './examples/calendar/modes?raw';
import OutsideDaysExample from './examples/calendar/outside-days';
import outsideDaysSource from './examples/calendar/outside-days?raw';
import StatesExample from './examples/calendar/states';
import statesSource from './examples/calendar/states?raw';

type CalendarSingleProps = Extract<CalendarProps, { mode: 'single' }>;

type CalendarRangeProps = Extract<CalendarProps, { mode: 'range' }>;

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Components/Calendar',
  tags: ['autodocs'],
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component: `Calendar lets the user pick a single date or a date range. Built on top of [\`react-day-picker\`](https://daypicker.dev/), so it accepts the full \`DayPickerProps\` API in addition to the props documented below.

Use DatePicker or DateRangePicker when a form field should open the calendar in a popup.`,
      },
    },
  },
  argTypes: {
    selected: {
      description:
        'Controlled selection: a Date in single mode, Date[] in multiple mode, or DateRange in range mode. Use with onSelect.',
      control: false,
      table: { category: 'Behavior', type: { summary: 'Date | Date[] | DateRange' } },
    },

    defaultMotion: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    monthCaptionAriaLabels: {
      table: {
        category: 'Content',
        type: {
          summary: "CalendarProps['monthCaptionAriaLabels']",
        },
      },
    },
    monthGridLabels: {
      table: {
        category: 'Content',
        type: {
          summary: "CalendarProps['monthGridLabels']",
        },
      },
    },
    yearGridLabels: {
      table: {
        category: 'Content',
        type: {
          summary: "CalendarProps['yearGridLabels']",
        },
      },
    },
    mode: {
      description: 'Date selection mode.',
      control: 'radio',
      options: ['single', 'range', 'multiple'],
      table: {
        category: 'Behavior',
        type: { summary: "'single' | 'multiple' | 'range'" },
      },
    },
    showOutsideDays: {
      description: 'Show days from adjacent months.',
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    yearsPerPage: {
      control: 'number',
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '16' },
      },
    },
    footer: {
      description: 'Footer content below the calendar.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    onMonthSelect: {
      table: {
        category: 'Events',
        type: { summary: '(month: number) => void' },
      },
    },
    onYearSelect: {
      table: {
        category: 'Events',
        type: { summary: '(year: number) => void' },
      },
    },
    onSelect: {
      description:
        'Called when the selection changes. Receives a date, date range, or date array according to mode.',
      table: {
        category: 'Events',
        type: { summary: 'OnSelectHandler<Date | DateRange | Date[]>' },
      },
    },
    onMonthChange: {
      description:
        'Fired when the user navigates between months via the arrow buttons or month/year picker.',
      table: {
        category: 'Events',
        type: { summary: '(month: Date) => void' },
      },
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Baseline Calendar in `single` mode with a static footer. Use this story to explore props via Controls.',
      },
    },
  },
  render: (args: CalendarProps) => <Calendar {...args} />,
  args: {
    showOutsideDays: false,
    footer: 'Pick a date',
    mode: 'single',
  } satisfies CalendarSingleProps,
};

export const Modes: Story = exampleStory(ModesExample, modesSource);

export const OutsideDays: Story = exampleStory(OutsideDaysExample, outsideDaysSource);

export const States: Story = exampleStory(StatesExample, statesSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Date range selection. Click a start date, then an end date to highlight the inclusive range.',
      },
    },
  },
  args: {
    ...(Default.args as CalendarSingleProps),
    mode: 'range',
    footer: undefined,
    disabled: { before: new Date() },
  } as CalendarRangeProps,
  render: function Range(args) {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

    const handleDateSelect: OnSelectHandler<DateRange | undefined> = (range) => {
      setSelectedRange(range);
    };

    const props: CalendarRangeProps = {
      ...(args as CalendarRangeProps),
      mode: 'range',
      selected: selectedRange,
      onSelect: handleDateSelect,
    };

    return (
      <Calendar
        {...props}
        footer={
          selectedRange?.from
            ? `From ${selectedRange.from.toLocaleDateString()}${selectedRange.to ? ` to ${selectedRange.to.toLocaleDateString()}` : ' — choose an end date'}`
            : 'Choose a start date'
        }
      />
    );
  },
};
