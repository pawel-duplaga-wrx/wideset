import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import { Button } from '../button/Button';
import OrientationExample from './examples/inline-alert/orientation';
import orientationSource from './examples/inline-alert/orientation?raw';
import PersistentExample from './examples/inline-alert/persistent';
import persistentSource from './examples/inline-alert/persistent?raw';
import StatusesExample from './examples/inline-alert/statuses';
import statusesSource from './examples/inline-alert/statuses?raw';
import { InlineAlert } from './InlineAlert';
import { useInlineAlert } from './InlineAlert.hooks';
import type { InlineAlertProps } from './InlineAlert.types';

const statuses: NonNullable<InlineAlertProps['status']>[] = ['error', 'warning', 'success', 'info'];

const orientations: NonNullable<InlineAlertProps['orientation']>[] = ['horizontal', 'vertical'];

const statusTitles: Record<NonNullable<InlineAlertProps['status']>, string> = {
  error: 'Publishing failed',
  warning: 'Review before publishing',
  success: 'Changes saved',
  info: 'Heads up',
};

const statusMessages: Record<NonNullable<InlineAlertProps['status']>, string> = {
  error: 'We could not publish your changes. Check the required fields and try again.',
  warning: 'This update affects 12 records. Confirm the details before you continue.',
  success: 'Your workspace was updated successfully and is ready to share.',
  info: 'A teammate left new comments on this file. Review them before the next handoff.',
};

const statusActions: Record<NonNullable<InlineAlertProps['status']>, string> = {
  error: 'Retry',
  warning: 'Review',
  success: 'Open',
  info: 'View',
};

const meta = {
  title: 'Components/InlineAlert',
  tags: ['autodocs'],
  component: InlineAlert,
  subcomponents: {
    'InlineAlert.Action': InlineAlert.Action,
    'InlineAlert.Outlet': InlineAlert.Outlet,
  },
  parameters: {
    docs: {
      description: {
        component: `InlineAlert presents persistent, in-context feedback inside the current layout.
Use it when the message should stay attached to the section or workflow it affects.
Do not use it for transient global notifications that should float above the interface; use Toast for that.

**Composition:**
\`\`\`
<InlineAlert>                — root, controls status, orientation, and dismiss behavior
  <InlineAlert.Title>        — optional short heading
  <InlineAlert.Message>      — main inline message
  <InlineAlert.Action>       — optional inline action; forwards Button props and defaults to border / secondary / sm
</InlineAlert>
\`\`\`

InlineAlert also supports an imperative \`useInlineAlert()\` API together with \`<InlineAlert.Outlet />\` when alerts should be triggered from a hook instead of rendered directly. Mount the outlet where alerts should appear in the layout.`,
      },
    },
  },
  argTypes: {
    dismissAriaLabel: { table: { category: 'Content', type: { summary: 'string' } } },
    status: {
      description: 'The semantic status of the alert.',
      control: 'radio',
      options: statuses,
      table: {
        category: 'Appearance',
        type: { summary: 'error | warning | success | info' },
        defaultValue: { summary: 'info' },
      },
    },
    orientation: {
      description: 'Layout orientation.',
      control: 'radio',
      options: orientations,
      table: {
        category: 'Appearance',
        type: { summary: 'horizontal | vertical' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    alertId: {
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    messageId: {
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    dismissed: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    title: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    message: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    persistent: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onDismiss: {
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof InlineAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

const useInlineAlertSource = `import { Button, InlineAlert, useInlineAlert } from '@wideset/react';

const AlertsSection = () => {
  const { ref, showInlineAlert, dismissAllInlineAlerts } = useInlineAlert();

  return (
    <section className="flex flex-col gap-ws-9">
      <div className="flex flex-wrap gap-ws-5">
        <Button
          onClick={() =>
            showInlineAlert({
              status: 'error',
              title: 'Publishing failed',
              message: 'We could not publish your changes. Please try again.',
              action: <InlineAlert.Action>Retry</InlineAlert.Action>,
            })
          }
        >
          Show error
        </Button>

        <Button variant="secondary" onClick={dismissAllInlineAlerts}>
          Dismiss all
        </Button>
      </div>

      <InlineAlert.Outlet ref={ref} />
    </section>
  );
};`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal working example with the default inline layout and active controls for the main public props.',
      },
    },
  },
  render: function Render(storyArgs) {
    const { status, title, message, ...args } = storyArgs;
    const currentStatus = status ?? 'info';

    return (
      <InlineAlert
        {...args}
        status={currentStatus}
        title={title ?? statusTitles[currentStatus]}
        message={message ?? statusMessages[currentStatus]}
      >
        <InlineAlert.Action>{statusActions[currentStatus]}</InlineAlert.Action>
      </InlineAlert>
    );
  },
  args: {
    status: 'info',
    orientation: 'horizontal',
    title: statusTitles.info,
    message: statusMessages.info,
    persistent: false,
    className: '',
  },
};

export const Statuses: Story = exampleStory(StatusesExample, statusesSource);

export const Orientation: Story = exampleStory(OrientationExample, orientationSource);

export const Persistent: Story = exampleStory(PersistentExample, persistentSource);

export const UseInlineAlert: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story:
          'Use `useInlineAlert` when a feature should trigger alerts imperatively without rendering `InlineAlert` directly. Keep `InlineAlert.Outlet` in the part of the layout where those alerts should appear.',
      },
      source: {
        code: useInlineAlertSource,
        language: 'tsx',
        type: 'code',
      },
    },
  },
  render: function Render() {
    const { ref, showInlineAlert, dismissAllInlineAlerts } = useInlineAlert();

    return (
      <div className="gap-ws-12 flex flex-col">
        <div className="gap-ws-9 flex flex-wrap">
          <Button
            variant="primary"
            onClick={() =>
              showInlineAlert({
                status: 'error',
                title: 'Publishing failed',
                message:
                  'We could not publish your changes. Check the required fields and try again.',
                action: <InlineAlert.Action>Retry</InlineAlert.Action>,
              })
            }
          >
            Show error alert
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showInlineAlert({
                status: 'success',
                title: 'Changes saved',
                message: 'Your workspace was updated successfully and is ready to share.',
                action: <InlineAlert.Action>Open</InlineAlert.Action>,
              })
            }
          >
            Show success alert
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showInlineAlert({
                status: 'warning',
                orientation: 'vertical',
                title: 'Review before publishing',
                message: 'This update affects 12 records. Confirm the details before you continue.',
                action: [
                  <InlineAlert.Action key="review">Review</InlineAlert.Action>,
                  <InlineAlert.Action key="dismiss" variant="secondary">
                    Dismiss
                  </InlineAlert.Action>,
                ],
              })
            }
          >
            Show warning alert
          </Button>
          <Button variant="secondary" onClick={dismissAllInlineAlerts}>
            Dismiss all
          </Button>
        </div>

        <InlineAlert.Outlet ref={ref} />
      </div>
    );
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the default dismissible state when the user should be able to clear the message locally. Switch to `persistent` when the alert must remain visible until another system or user action removes it. The `dismissed` prop can also be controlled externally to hide the alert completely.',
      },
    },
  },
  argTypes: {
    persistent: { table: { disable: true } },
    dismissed: { table: { disable: true } },
    title: { table: { disable: true } },
    message: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <div className="gap-ws-11 flex flex-col">
      <InlineAlert
        {...args}
        persistent={false}
        title="Dismissible alert"
        message="Use this state when the user should be able to clear the message after reading it."
      >
        <InlineAlert.Action>Retry</InlineAlert.Action>
      </InlineAlert>
      <InlineAlert
        {...args}
        persistent
        title="Persistent alert"
        message="Use this state when the alert must stay visible until another action resolves it."
      >
        <InlineAlert.Action>Contact support</InlineAlert.Action>
      </InlineAlert>
    </div>
  ),
  args: {
    ...Default.args,
    status: 'warning',
  },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A more complete composition for multi-step guidance: combine title and message slots with more than one action when the alert needs to keep the user inside the current workflow.',
      },
    },
  },
  argTypes: {
    status: { table: { disable: true } },
    orientation: { table: { disable: true } },
    title: { table: { disable: true } },
    message: { table: { disable: true } },
    persistent: { table: { disable: true } },
    dismissed: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: (args) => (
    <InlineAlert {...args} status="warning" orientation="vertical">
      <InlineAlert.Title>Pending changes require review</InlineAlert.Title>
      <InlineAlert.Message>
        23 records were updated automatically. Review the affected fields before you publish the
        next release.
      </InlineAlert.Message>
      <InlineAlert.Action>Review changes</InlineAlert.Action>
      <InlineAlert.Action variant="secondary">Dismiss</InlineAlert.Action>
    </InlineAlert>
  ),
  args: {
    ...Default.args,
  },
};
