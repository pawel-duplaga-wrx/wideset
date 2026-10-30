import { RiMoreFill } from '@remixicon/react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { exampleStory } from '../../stories/example';
import { Button } from '../button/Button';
import { DropdownMenu } from '../dropdown/DropdownMenu';
import StatusesExample from './examples/toast/statuses';
import statusesSource from './examples/toast/statuses?raw';
import VariantsExample from './examples/toast/variants';
import variantsSource from './examples/toast/variants?raw';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './Toast.context';
import type { ToastProps } from './Toast.types';

const statuses: NonNullable<ToastProps['status']>[] = ['neutral', 'info', 'success', 'error'];

const variants: NonNullable<ToastProps['variant']>[] = ['basic', 'expanded'];

const statusMessages: Record<NonNullable<ToastProps['status']>, string> = {
  neutral: 'Changes saved',
  info: 'A new version is available',
  success: 'Workspace synced successfully',
  error: 'Unable to publish changes',
};

const statusActions: Record<NonNullable<ToastProps['status']>, string> = {
  neutral: 'View',
  info: 'Details',
  success: 'Open',
  error: 'Retry',
};

const meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  component: Toast,
  subcomponents: {
    'Toast.Action': Toast.Action,
  },
  parameters: {
    docs: {
      description: {
        component: `Toast surfaces brief, non-blocking feedback about the result of a user action or system event.
Use it for confirmations, warnings, and errors that should stay visible without interrupting the current workflow.

Use InlineAlert for feedback that belongs to a specific section, or Modal when the user must respond.

**Composition:**
\`\`\`
<Toast>                — root, controls status, variant, dismiss behavior, footer, and progress
  <Toast.Message>      — primary message
  <Toast.Description>  — optional supporting detail, typically in the expanded variant
  <Toast.Action>       — optional inline action such as Undo or Retry
</Toast>
\`\`\`

Toast also supports an imperative \`useToast()\` API for features that should trigger feedback without rendering \`Toast\` directly. Mount \`ToastProvider\` high in the app tree, such as the app shell or route layout.`,
      },
    },
  },
  argTypes: {
    dismissAriaLabel: {
      control: 'text',
      description: "Accessible label for the dismiss button. Defaults to `'Dismiss'`.",
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: "'Dismiss'" },
      },
    },
    status: {
      control: 'radio',
      options: statuses,
      description: 'The visual style status of the toast.',
      table: {
        category: 'Appearance',
        type: { summary: 'error | success | info | neutral' },
        defaultValue: { summary: 'neutral' },
      },
    },
    variant: {
      description:
        'Layout of the toast. Defaults to basic; choose expanded to use a footer and progress.',
      control: 'radio',
      options: variants,
      table: {
        category: 'Appearance',
        type: { summary: 'basic | expanded' },
        defaultValue: { summary: 'basic' },
      },
    },
    duration: {
      description:
        'Auto-dismiss duration in milliseconds. Use `0` to keep the toast visible until dismissed.',
      control: { type: 'number', min: 0, step: 100 },
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '5000' },
      },
    },
    progress: {
      description: 'Progress value from `0` to `100`. Only applies to the `expanded` variant.',
      control: { type: 'number', min: 0, max: 100, step: 1 },
      if: { arg: 'variant', eq: 'expanded' },
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
      },
    },
    footer: {
      description:
        'Footer content for the expanded variant; accepts a node or a function receiving remaining milliseconds.',
      if: { arg: 'variant', eq: 'expanded' },
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode | ((duration: number) => ReactNode)' },
      },
    },
    onDismiss: {
      description: 'Called when the dismiss button is pressed.',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    children: {
      description:
        'Toast content, typically composed from `Toast.Message`, `Toast.Description`, and `Toast.Action`.',
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      description: 'Additional CSS classes merged with the toast root element.',
      control: 'text',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const useToastSource = `import { Button, ToastProvider, useToast } from '@wideset/react';

function ToastActions() {
    const { showToast } = useToast();

    return (
      <div className="gap-ws-12 flex flex-col">
        <p className="typography-body-md text-ws-static-subtle max-w-176">
          Trigger toasts imperatively from any feature under the provider. In the real app, mount{' '}
          <code>ToastProvider</code> high in the tree, for example in the app shell or a route
          layout.
        </p>
        <div className="gap-ws-9 flex flex-wrap">
          <Button
            variant="primary"
            onClick={() =>
              showToast({
                content: 'Settings saved successfully',
                status: 'success',
                action: 'Undo',
              })
            }
          >
            Show success toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showToast({
                content: 'Import is still running',
                description: '18 files are still being processed in the background.',
                status: 'info',
                variant: 'expanded',
                duration: 8000,
                footer: (duration: number) =>
                  \`Closes in \${Math.max(1, Math.ceil(duration / 1000))} seconds\`,
              })
            }
          >
            Show expanded toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showToast({
                content: 'Connection lost',
                status: 'error',
                duration: 0,
                action: 'Retry',
              })
            }
          >
            Show persistent toast
          </Button>
        </div>
      </div>
    );
}

export function App() {
  return <ToastProvider><ToastActions /></ToastProvider>;
}`;

const positionsSource = `import { Button, ToastProvider, useToast } from '@wideset/react';

function ToastTrigger() {
  const { showToast } = useToast();
  return <Button onClick={() => showToast({ content: 'Changes saved', action: 'Undo' })}>Show toast</Button>;
}

export function App() {
  return (
    <div>
      {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((position) => (
        <ToastProvider key={position} position={position}>
          <section aria-label={position}>
            <p>{position}</p>
            <ToastTrigger />
          </section>
        </ToastProvider>
      ))}
    </div>
  );
}`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal toast example with the default compact layout and active controls for the main public props.',
      },
    },
  },
  render: function Render(storyArgs) {
    const { onDismiss, status, ...args } = storyArgs;
    const currentStatus = status ?? 'neutral';

    void onDismiss;

    return (
      <div className="w-100">
        <Toast {...args} status={currentStatus}>
          <Toast.Message>{statusMessages[currentStatus]}</Toast.Message>
          <Toast.Action>{statusActions[currentStatus]}</Toast.Action>
        </Toast>
      </div>
    );
  },
  args: {
    status: 'neutral',
    variant: 'basic',
    duration: 5000,
    className: '',
  },
};

export const Variants: Story = exampleStory(VariantsExample, variantsSource);

export const Statuses: Story = exampleStory(StatusesExample, statusesSource);

export const Positions: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story:
          'Set `position` on `ToastProvider` to choose the screen edge the stack is anchored to. Trigger a few toasts and hover the stack: bottom positions expand upward, top positions expand downward, so the stack always stays inside the viewport.',
      },
      source: {
        code: positionsSource,
        language: 'tsx',
        type: 'code',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="gap-ws-9 flex flex-wrap">
        {(
          [
            'top-left',
            'top-center',
            'top-right',
            'bottom-left',
            'bottom-center',
            'bottom-right',
          ] as const
        ).map((position) => (
          <ToastProvider key={position} position={position}>
            <section aria-label={position}>
              <p>{position}</p>
              <Story />
            </section>
          </ToastProvider>
        ))}
      </div>
    ),
  ],
  render: function Render() {
    const { showToast } = useToast();
    return (
      <Button
        variant="secondary"
        onClick={() => showToast({ content: 'Changes saved', action: 'Undo' })}
      >
        Show toast
      </Button>
    );
  },
};

export const MoreActions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The top-right cluster can hold extra icon actions next to the dismiss button — compose `Toast.IconAction` (here a "more options" trigger opening a `DropdownMenu`) and it lands before the X, matching the Actions cluster in Figma.',
      },
    },
  },
  argTypes: {
    variant: { table: { disable: true } },
    footer: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: function Render(storyArgs) {
    const { footer, variant, ...args } = storyArgs;

    void footer;
    void variant;

    return (
      <div className="w-100">
        <Toast
          {...args}
          variant="expanded"
          footer={(duration: number) =>
            `This message closes in ${Math.max(1, Math.ceil(duration / 1000))} seconds`
          }
        >
          <Toast.Message>Workspace synced successfully</Toast.Message>
          <Toast.Description>
            23 design tokens and 6 component contracts were updated.
          </Toast.Description>
          <Toast.Action variant="secondary">Review changes</Toast.Action>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Toast.IconAction icon={RiMoreFill} aria-label="More options" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Item>Snooze</DropdownMenu.Item>
              <DropdownMenu.Item>Copy summary</DropdownMenu.Item>
              <DropdownMenu.Item>Notification settings</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </Toast>
      </div>
    );
  },
  args: {
    ...Default.args,
    status: 'success',
    variant: 'expanded',
    duration: 8000,
    progress: 72,
  },
};

export const UseToast: Story = {
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        story:
          'Use `useToast` when feedback should be triggered imperatively from a feature that does not render `Toast` directly. Keep `ToastProvider` high in the application tree so any descendant can call `showToast`.',
      },
      source: {
        code: useToastSource,
        language: 'tsx',
        type: 'code',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  render: function Render() {
    const { showToast } = useToast();

    return (
      <div className="gap-ws-12 flex flex-col">
        <p className="typography-body-md text-ws-static-subtle max-w-176">
          Trigger toasts imperatively from any feature under the provider. In the real app, mount{' '}
          <code>ToastProvider</code> high in the tree, for example in the app shell or a route
          layout.
        </p>
        <div className="gap-ws-9 flex flex-wrap">
          <Button
            variant="primary"
            onClick={() =>
              showToast({
                content: 'Settings saved successfully',
                status: 'success',
                action: 'Undo',
              })
            }
          >
            Show success toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showToast({
                content: 'Import is still running',
                description: '18 files are still being processed in the background.',
                status: 'info',
                variant: 'expanded',
                duration: 8000,
                footer: (duration: number) =>
                  `Closes in ${Math.max(1, Math.ceil(duration / 1000))} seconds`,
              })
            }
          >
            Show expanded toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showToast({
                content: 'Connection lost',
                status: 'error',
                duration: 0,
                action: 'Retry',
              })
            }
          >
            Show persistent toast
          </Button>
        </div>
      </div>
    );
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Static previews of success, error, and informational feedback, including a dismiss button when `onDismiss` is provided. The button reports the callback in Actions; these previews stay visible. See UseToast for provider-managed dismissal and persistent notifications with `duration={0}`.',
      },
    },
  },
  argTypes: {
    status: { table: { disable: true } },
    duration: { table: { disable: true } },
    onDismiss: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: ({ onDismiss, ...args }) => (
    <div className="gap-ws-9 flex w-100 flex-col">
      <Toast {...args} status="success">
        <Toast.Message>Draft saved automatically</Toast.Message>
      </Toast>
      <Toast {...args} status="error" onDismiss={onDismiss}>
        <Toast.Message>Connection lost</Toast.Message>
        <Toast.Action>Retry</Toast.Action>
      </Toast>
      <Toast {...args} status="info" duration={0}>
        <Toast.Message>Export is still running</Toast.Message>
        <Toast.Action>Open queue</Toast.Action>
      </Toast>
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A more complete composition for longer workflow feedback: combine `Toast.Message`, `Toast.Description`, and `Toast.Action`, then add footer or progress only when the user benefits from extra context.',
      },
    },
  },
  argTypes: {
    variant: { table: { disable: true } },
    footer: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: function Render(storyArgs) {
    const { footer, variant, ...args } = storyArgs;

    void footer;
    void variant;

    return (
      <div className="w-100">
        <Toast
          {...args}
          variant="expanded"
          footer={(duration: number) =>
            `This message closes in ${Math.max(1, Math.ceil(duration / 1000))} seconds`
          }
        >
          <Toast.Message>Workspace synced successfully</Toast.Message>
          <Toast.Description>
            23 design tokens and 6 component contracts were updated. Review the diff now or keep
            working and come back later.
          </Toast.Description>
          <Toast.Action variant="secondary">Review changes</Toast.Action>
        </Toast>
      </div>
    );
  },
  args: {
    ...Default.args,
    status: 'success',
    variant: 'expanded',
    duration: 8000,
    progress: 72,
  },
};
