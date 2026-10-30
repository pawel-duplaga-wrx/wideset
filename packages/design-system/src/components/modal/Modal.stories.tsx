import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithoutRef } from 'react';
import { useArgs } from 'storybook/preview-api';

import { exampleStory } from '../../stories/example';
import { Button } from '../button/Button';
import FootersExample from './examples/modal/footers';
import footersSource from './examples/modal/footers?raw';
import PersistentExample from './examples/modal/persistent';
import persistentSource from './examples/modal/persistent?raw';
import { Modal } from './Modal';
import type { ModalContentProps } from './Modal.types';

type ModalStoryArgs = Pick<ComponentPropsWithoutRef<typeof Modal>, 'open' | 'onOpenChange'> &
  ModalContentProps;

const argTypes = {
  showCloseButton: {
    description: 'Renders the close button in the top-right corner. Defaults to `true`.',
    control: 'boolean',
    table: {
      category: 'Appearance',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'true' },
    },
  },
  persistent: {
    description: 'Prevents closing the modal by outside click and Escape key.',
    control: 'boolean',
    table: {
      category: 'Behavior',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  autoFocusOnOpen: {
    description: 'Focuses into modal after opening.',
    control: 'boolean',
    table: {
      category: 'Behavior',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'true' },
    },
  },
  open: {
    description: 'Controls the modal open state. This prop is passed to Modal.',
    control: 'boolean',
    table: {
      category: 'Behavior',
      type: { summary: 'boolean' },
    },
  },
  onOpenChange: {
    description: 'Called when the modal open state changes. This callback is passed to Modal.',
    table: {
      category: 'Events',
      type: { summary: '(open: boolean) => void' },
    },
  },
} satisfies ArgTypes<ModalStoryArgs>;

const meta = {
  title: 'Components/Modal/Modal',
  tags: ['autodocs'],
  component: Modal,
  subcomponents: {
    'Modal.Content': Modal.Content,

    'Modal.Footer': Modal.Footer,
  },
  parameters: {
    docs: {
      description: {
        component: `Modal is a dialog for focused interactions that require user attention before continuing.
Use it for confirmations, forms, and detail views that interrupt the current workflow.

Use Popup for lightweight information anchored to a trigger, or Sidepanel for contextual detail beside the page.

**Composition:**
\`\`\`
<Modal>                   — root, controls open state and dismiss behavior
  <Modal.Trigger>         — opens the modal
  <Modal.Content>         — dialog surface; owns scrolling and the close button
    <Modal.Header>        — title area; reserves space for the close button
      <Modal.Title>       — accessible dialog title
      <Modal.Description> — optional supporting text
    <Modal.Body>          — scrollable body
    <Modal.Footer>        — action area; supports default and extension variants
      <Modal.Close>       — bare renders the styled X; with asChild wraps your own control
</Modal>
\`\`\``,
      },
    },
  },
  argTypes,
  render: function Render(args: ModalStoryArgs) {
    const [{ open = false }, updateArgs] = useArgs<ModalStoryArgs>();
    const { onOpenChange, ...contentArgs } = args;

    const handleOpenChange = (nextOpen: boolean) => {
      updateArgs({ open: nextOpen });
      onOpenChange?.(nextOpen);
    };

    return (
      <Modal open={open} onOpenChange={handleOpenChange}>
        <Modal.Trigger asChild>
          <Button size="md">Open modal</Button>
        </Modal.Trigger>
        <Modal.Content {...contentArgs}>
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
            <Modal.Description>
              Modal Description that runs long enough to wrap onto a second line, so the gap to the
              close button stays fixed instead of collapsing.
            </Modal.Description>
          </Modal.Header>
          <Modal.Body>Content here</Modal.Body>
          <Modal.Footer>
            <Modal.Close asChild>
              <Button variant="secondary" preset="border">
                Cancel
              </Button>
            </Modal.Close>
            <Modal.Close asChild>
              <Button preset="filled">Accept</Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground — click Open modal, then use the controls panel to toggle the close button, persistent mode, and other props.',
      },
    },
  },

  args: {
    open: false,
    persistent: false,
    showCloseButton: true,
    autoFocusOnOpen: true,
  },
};

export const Footers: Story = exampleStory(FootersExample, footersSource);

export const Persistent: Story = exampleStory(PersistentExample, persistentSource);

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The extension footer variant uses space-between alignment — secondary action on the left, primary on the right — for layouts that need extra visual separation.',
      },
    },
  },
  render: () => (
    <Modal>
      <Modal.Trigger asChild>
        <Button size="md">Open footer extension</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Extension Footer</Modal.Title>
          <Modal.Description>
            Example of Modal.Footer with variant set to extension.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body>Content here</Modal.Body>
        <Modal.Footer variant="extension">
          <Modal.Close asChild>
            <Button variant="secondary" preset="border">
              Secondary action
            </Button>
          </Modal.Close>
          <Modal.Close asChild>
            <Button preset="filled">Primary action</Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
};
