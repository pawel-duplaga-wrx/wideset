import type { Meta, StoryObj } from '@storybook/react-vite';

import { HelperText } from './HelperText';

const meta = {
  title: 'Helper Components/HelperText',
  tags: ['autodocs'],
  component: HelperText,
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    state: {
      control: 'select',
      description: 'State of the helper text',
      options: ['default', 'error', 'warning', 'success'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof HelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <HelperText {...args} />,
  args: { children: 'Helper text', state: 'default' },
};

export const AllVariants = () => (
  <div className="gap-ws-16 flex flex-col">
    <HelperText>Helper text</HelperText>
    <div className="gap-ws-8 flex flex-col">
      <HelperText state="error">Helper text</HelperText>
      <HelperText state="warning">Helper text</HelperText>
      <HelperText state="success">Helper text</HelperText>
    </div>
    <div className="gap-ws-8 flex flex-col">
      <HelperText state="error" showIcon>
        Helper text
      </HelperText>
      <HelperText state="warning" showIcon>
        Helper text
      </HelperText>
      <HelperText state="success" showIcon>
        Helper text
      </HelperText>
    </div>
  </div>
);
