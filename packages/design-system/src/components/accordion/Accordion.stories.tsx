import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { exampleStory } from '../../stories/example';
import { Accordion } from './Accordion';
import CaptionsExample from './examples/accordion/captions';
import captionsSource from './examples/accordion/captions?raw';
import ContainedExample from './examples/accordion/contained';
import containedSource from './examples/accordion/contained?raw';
import IconsExample from './examples/accordion/icons';
import iconsSource from './examples/accordion/icons?raw';
import StatesExample from './examples/accordion/states';
import statesSource from './examples/accordion/states?raw';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  subcomponents: {
    'Accordion.Icon': Accordion.Icon,
  },
  parameters: {
    docs: {
      description: {
        component: `Accordion organizes content into collapsible sections.
Use the \`contained\` variant when sections should be visually separated by cards.
Use \`single\` to allow only one section open at a time, \`multiple\` to allow several.

Use Tabs when sections should replace one another without expanding inline.

**Composition:**
\`\`\`
<Accordion>              — root, controls type/collapsible/disabled
  <Accordion.Item>       — individual section, owns \`value\`
    <Accordion.Trigger>  — clickable header
      <Accordion.Icon>   — optional leading icon
      <Accordion.Title>  — primary label (alternative to plain text)
      <Accordion.Caption>— secondary label, below Title
    </Accordion.Trigger>
    <Accordion.Content>  — collapsible body
  </Accordion.Item>
</Accordion>
\`\`\``,
      },
    },
  },
  argTypes: {
    defaultMotion: {
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
    contained: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      description: 'Whether only one or multiple items can be open at once.',
      control: false,
      required: true,
      table: {
        category: 'Behavior',
        type: { summary: "'single' | 'multiple'" },
      },
    },
    collapsible: {
      description: 'Whether accordion items can be collapsed when type is "single".',
      control: 'boolean',
      if: { arg: 'type', eq: 'single' },
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      description: 'Whether the accordion is disabled.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultValue: {
      description: 'The value of the item to expand when initially rendered (uncontrolled).',
      control: 'text',
      if: { arg: 'type', eq: 'single' },
      table: {
        category: 'Behavior',
        type: { summary: 'string | string[]' },
      },
    },
    value: {
      description: 'The controlled value of the item to expand.',
      control: 'text',
      if: { arg: 'type', eq: 'single' },
      table: {
        category: 'Behavior',
        type: { summary: 'string | string[]' },
      },
    },
    onValueChange: {
      description: 'Event handler called when the expanded state of an item changes.',
      table: {
        category: 'Events',
        type: { summary: '(value: string | string[]) => void' },
      },
    },
    asChild: {
      description:
        'Renders the accordion through its child element instead of the default root element.',
      control: false,
      table: { category: 'Behavior', type: { summary: 'boolean' } },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default accordion without card borders. Starting point with full Storybook controls support.',
      },
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Accordion {...args}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Item 2</Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Item 3</Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  args: {
    contained: false,
    type: 'single',
    collapsible: true,
    disabled: false,
    defaultValue: 'item-1',
  },
};

export const Contained: Story = {
  ...exampleStory(ContainedExample, containedSource),
  args: { type: 'single' },
};

export const Icons: Story = {
  ...exampleStory(IconsExample, iconsSource),
  args: { type: 'single' },
};

export const Captions: Story = {
  ...exampleStory(CaptionsExample, captionsSource),
  args: { type: 'single' },
};

export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The `multiple` type allows several sections to be open at the same time.',
      },
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Accordion {...args}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Item 2</Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Item 3</Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  args: {
    contained: false,
    disabled: false,
    type: 'multiple',
    defaultValue: [],
  },
};

export const Controlled: Story = {
  argTypes: { value: { control: false } },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled mode — state managed externally via `value` and `onValueChange`. Use when the accordion state must be synchronized with other UI elements.',
      },
    },
  },
  render: function Controlled(args) {
    const [value, setValue] = React.useState('item-1');
    return (
      <div className="w-full max-w-md">
        <Accordion
          {...args}
          type="single"
          defaultValue={undefined}
          value={value}
          onValueChange={(nextValue) => {
            setValue(nextValue);
            if (args.type === 'single') args.onValueChange?.(nextValue);
          }}
        >
          <Accordion.Item value="item-1">
            <Accordion.Trigger>Item 1</Accordion.Trigger>
            <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger>Item 2</Accordion.Trigger>
            <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Trigger>Item 3</Accordion.Trigger>
            <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
  args: Default.args,
};

export const States: Story = {
  ...exampleStory(StatesExample, statesSource),
  args: { type: 'single' },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Disabled state at the accordion level via the `disabled` prop on `Accordion`. A disabled accordion does not respond to interaction and renders with muted styles.',
      },
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Accordion {...args}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Item 1</Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Item 2</Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Item 3</Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Composition with a title and caption inside the trigger. Uses `Accordion.Title` and `Accordion.Caption` inside `Accordion.Trigger`.',
      },
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Accordion {...args}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>
            <div className="flex flex-col">
              <Accordion.Title>Title 1</Accordion.Title>
              <Accordion.Caption>Caption 1</Accordion.Caption>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>
            <div className="flex flex-col">
              <Accordion.Title>Title 2</Accordion.Title>
              <Accordion.Caption>Caption 2</Accordion.Caption>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>
            <div className="flex flex-col">
              <Accordion.Title>Title 3</Accordion.Title>
              <Accordion.Caption>Caption 3</Accordion.Caption>
            </div>
          </Accordion.Trigger>
          <Accordion.Content>Lorem ipsum dolor sit amet</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  args: Default.args,
};
