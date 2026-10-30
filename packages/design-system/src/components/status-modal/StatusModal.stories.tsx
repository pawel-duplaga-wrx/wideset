import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithoutRef } from 'react';
import { useArgs } from 'storybook/preview-api';

import { exampleStory } from '../../stories/example';
import { Button } from '../button/Button';
import OrientationExample from './examples/status-modal/orientation';
import orientationSource from './examples/status-modal/orientation?raw';
import StatusesExample from './examples/status-modal/statuses';
import statusesSource from './examples/status-modal/statuses?raw';
import { StatusModal } from './StatusModal';
import type {
  StatusModalContentProps,
  StatusModalOrientation,
  StatusModalStatus,
} from './StatusModal.types';

const statuses: StatusModalStatus[] = ['neutral', 'positive', 'notice', 'information', 'error'];

const orientations: StatusModalOrientation[] = ['horizontal', 'vertical'];

type StatusModalStoryArgs = Pick<
  ComponentPropsWithoutRef<typeof StatusModal>,
  'open' | 'onOpenChange' | 'status' | 'orientation'
> &
  Pick<StatusModalContentProps, 'showCloseButton'>;

const meta = {
  title: 'Components/Modal/StatusModal',
  tags: ['autodocs'],
  component: StatusModal,
  subcomponents: {
    'StatusModal.Content': StatusModal.Content,
    'StatusModal.Title': StatusModal.Title,
    'StatusModal.Body': StatusModal.Body,
    'StatusModal.Footer': StatusModal.Footer,
  },
  parameters: {
    docs: {
      description: {
        component: `StatusModal is a dialog variant that communicates status through icon style, color accents, and layout orientation.
Use it for confirmations, warnings, or errors that benefit from a stronger visual signal than a standard modal.

Use Modal for dialogs without a status emphasis, or InlineAlert for feedback that stays in the page.

**Composition:**
\`\`\`
<StatusModal>               — root, controls status, orientation, and open state
  <StatusModal.Trigger>     — opens the modal
  <StatusModal.Content>     — dialog surface with status-driven background gradient
    <StatusModal.Title>     — accessible title with inline status icon
    <StatusModal.Body>      — body text area
    <StatusModal.Footer>    — action area; alignment adapts to orientation
  <StatusModal.Close>       — closes the modal when triggered
</StatusModal>
\`\`\``,
      },
    },
  },
  argTypes: {
    status: {
      control: 'radio',
      options: statuses,
      table: {
        category: 'Appearance',
        type: { summary: "'neutral' | 'positive' | 'notice' | 'information' | 'error'" },
        defaultValue: { summary: 'neutral' },
      },
    },
    orientation: {
      control: 'radio',
      options: orientations,
      table: {
        category: 'Appearance',
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    open: {
      description: 'Controls the modal open state.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      description: 'Called when the modal open state changes.',
      table: {
        category: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },
  },
} satisfies Meta<typeof StatusModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground — click Open status modal, then use the controls panel to change status, orientation, and close button visibility.',
      },
    },
  },
  render: function Render(args) {
    // useArgs must run in the story render context itself, not in an extracted child component or it will break Storybook's args handling
    const [{ open }, updateArgs] = useArgs<StatusModalStoryArgs>();
    const { onOpenChange, status, orientation, showCloseButton } = args;

    const handleOpenChange = (nextOpen: boolean) => {
      updateArgs({ open: nextOpen });
      onOpenChange?.(nextOpen);
    };

    return (
      <StatusModal
        open={open}
        onOpenChange={handleOpenChange}
        status={status}
        orientation={orientation}
      >
        <StatusModal.Trigger asChild>
          <Button size="md">Open status modal</Button>
        </StatusModal.Trigger>
        <StatusModal.Content showCloseButton={showCloseButton}>
          <StatusModal.Title>Status Modal Title</StatusModal.Title>
          <StatusModal.Body>
            This is status modal content. It supports status-driven icon styles and orientation.
          </StatusModal.Body>
          <StatusModal.Footer>
            <StatusModal.Close asChild>
              <Button size="sm" variant="secondary" preset="border">
                Cancel
              </Button>
            </StatusModal.Close>
            <StatusModal.Close asChild>
              <Button size="sm" preset="border">
                Confirm
              </Button>
            </StatusModal.Close>
          </StatusModal.Footer>
        </StatusModal.Content>
      </StatusModal>
    );
  },
  args: {
    open: false,
    status: 'neutral',
    orientation: 'horizontal',
    showCloseButton: true,
  },
};

export const Statuses: Story = exampleStory(StatusesExample, statusesSource);

export const Orientation: Story = exampleStory(OrientationExample, orientationSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Compose an error dialog with a title, explanatory body, and explicit cancel and delete actions.',
      },
    },
  },
  args: { ...Default.args, status: 'error' },
  render: function Render(args) {
    // useArgs must run in the story render context itself, not in an extracted child component or it will break Storybook's args handling
    const [{ open }, updateArgs] = useArgs<StatusModalStoryArgs>();
    const { onOpenChange, status, orientation, showCloseButton } = args;

    const handleOpenChange = (nextOpen: boolean) => {
      updateArgs({ open: nextOpen });
      onOpenChange?.(nextOpen);
    };

    return (
      <StatusModal
        open={open}
        onOpenChange={handleOpenChange}
        status={status}
        orientation={orientation}
      >
        <StatusModal.Trigger asChild>
          <Button size="md">Open status modal</Button>
        </StatusModal.Trigger>
        <StatusModal.Content showCloseButton={showCloseButton}>
          <StatusModal.Title>Delete workspace?</StatusModal.Title>
          <StatusModal.Body>
            Deleting this workspace permanently removes its projects and settings.
          </StatusModal.Body>
          <StatusModal.Footer>
            <StatusModal.Close asChild>
              <Button size="sm" variant="secondary" preset="border">
                Cancel
              </Button>
            </StatusModal.Close>
            <StatusModal.Close asChild>
              <Button size="sm" preset="border">
                Delete workspace
              </Button>
            </StatusModal.Close>
          </StatusModal.Footer>
        </StatusModal.Content>
      </StatusModal>
    );
  },
};
