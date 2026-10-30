import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import EmphasisExample from './examples/system-alert/emphasis';
import emphasisSource from './examples/system-alert/emphasis?raw';
import StatusesExample from './examples/system-alert/statuses';
import statusesSource from './examples/system-alert/statuses?raw';
import { SystemAlert } from './SystemAlert';
import type { SystemAlertProps } from './SystemAlert.types';

const statuses: SystemAlertProps['status'][] = [
  'negative',
  'notice',
  'positive',
  'info',
  'neutral',
];

const emphases: SystemAlertProps['emphasis'][] = ['low', 'high'];

const meta = {
  parameters: {
    docs: {
      description: {
        component:
          'SystemAlert displays a dismissible page-level status message. Use it for service notices and feedback affecting the whole page. Use InlineAlert for section-level feedback and Toast for brief notifications.',
      },
    },
  },
  title: 'Components/SystemAlert',
  tags: ['autodocs'],
  component: SystemAlert,
  argTypes: {
    dismissed: { table: { category: 'Behavior', type: { summary: 'boolean' } } },
    dismissAriaLabel: { table: { category: 'Content', type: { summary: 'string' } } },
    status: {
      control: 'select',
      options: statuses,
      table: {
        category: 'Appearance',
        type: { summary: 'negative | notice | positive | info | neutral' },
        defaultValue: { summary: 'positive' },
      },
    },
    emphasis: {
      control: 'select',
      options: emphases,
      table: {
        category: 'Appearance',
        type: { summary: 'low | high' },
        defaultValue: { summary: 'low' },
      },
    },
    message: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
    dismissible: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onDismiss: {
      table: { category: 'Events', type: { summary: '() => void' } },
    },
    children: {
      description:
        'Use SystemAlert.Message and SystemAlert.Action inside children. The message slot overrides the message prop.',
      table: { category: 'Content', type: { summary: 'ReactNode' } },
    },
  },
} satisfies Meta<typeof SystemAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { docs: { description: { story: 'Minimal example with editable controls.' } } },
  render: (args) => (
    <SystemAlert {...args}>
      <SystemAlert.Action>Action</SystemAlert.Action>
    </SystemAlert>
  ),
  args: {
    message: 'System alert message',
  },
};

export const Statuses: Story = exampleStory(StatusesExample, statusesSource);

export const Emphasis: Story = exampleStory(EmphasisExample, emphasisSource);

export const LongMessage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A long notice wraps across multiple lines while keeping its action available. Use concise messages in production.',
      },
    },
  },
  render: (args) => (
    <SystemAlert {...args}>
      <SystemAlert.Action>Action</SystemAlert.Action>
    </SystemAlert>
  ),
  args: {
    status: 'notice',
    emphasis: 'low',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis odio in tellus mattis consequat. Proin efficitur tempor diam, id ullamcorper lacus lobortis pulvinar. Sed tincidunt enim congue neque congue, ut pellentesque ante finibus. Phasellus non nisi et augue pretium luctus vel id ipsum. Curabitur luctus congue sollicitudin. Suspendisse bibendum finibus luctus. Quisque eros turpis, tristique sit amet risus fermentum, tincidunt tincidunt arcu.',
  },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compose SystemAlert.Message with SystemAlert.Action when the message needs custom markup and an adjacent action.',
      },
    },
  },
  render: (args) => (
    <SystemAlert {...args}>
      <SystemAlert.Message>System alert message</SystemAlert.Message>
      <SystemAlert.Action>Action</SystemAlert.Action>
    </SystemAlert>
  ),
  args: {
    status: 'positive',
    emphasis: 'low',
  },
};
