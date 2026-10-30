import type { Meta, StoryObj } from '@storybook/react-vite';

import { LinkButton } from '../button/LinkButton';
import { FieldLabel } from './FieldLabel';

const meta = {
  title: 'Helper Components/FieldLabel',
  tags: ['autodocs'],
  component: FieldLabel,
  argTypes: {
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    suffix: {
      control: 'text',
      description: 'Optional suffix text displayed after the label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip content to display in an info icon',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    aside: {
      control: 'text',
      description: 'Additional content to display on the right side',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    description: {
      control: 'text',
      description: 'Description text to display below the label',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: 'text',
      description: 'The label text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof FieldLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <FieldLabel {...args} />,
  args: {
    children: 'Field Label',
  },
};

export const Required: Story = {
  render: () => <FieldLabel required>Required Field</FieldLabel>,
};

export const WithSuffix: Story = {
  render: () => <FieldLabel suffix="(optional)">Field Label</FieldLabel>,
};

export const WithTooltipAndDescription: Story = {
  render: () => (
    <FieldLabel
      tooltip="This is a helpful tooltip that provides additional information about the field."
      description="This is a description that appears below the label to provide more context."
    >
      Field Label
    </FieldLabel>
  ),
};

export const WithAside: Story = {
  render: () => (
    <div className="gap-ws-8 flex flex-col">
      <FieldLabel aside="0/100">Field Label</FieldLabel>
      <FieldLabel
        aside={
          <div>
            <LinkButton href="#">Link</LinkButton>
            <span>Other text</span>
          </div>
        }
      >
        Field Label
      </FieldLabel>
    </div>
  ),
};
