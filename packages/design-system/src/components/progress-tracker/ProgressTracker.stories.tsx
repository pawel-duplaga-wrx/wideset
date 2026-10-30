import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import { exampleStory } from '../../stories/example';
import StatusesExample from './examples/progress-tracker/statuses';
import statusesSource from './examples/progress-tracker/statuses?raw';
import { ProgressTracker } from './ProgressTracker';
import type { ProgressTrackerProps } from './ProgressTracker.types';
import { ProgressTrackerStep } from './ProgressTrackerStep';

const meta = {
  title: 'Components/ProgressTracker',
  tags: ['autodocs'],
  component: ProgressTracker,
  subcomponents: { 'ProgressTracker.Step': ProgressTrackerStep },
  parameters: {
    docs: {
      description: {
        component: `ProgressTracker displays workflow progress as a row of status segments. Each segment's colour reflects its status: completed (green), active (primary), error (red), or incomplete (grey).

Step status is computed automatically from \`activeStep\`, or overridden per-step with an explicit \`status\` prop. Tooltips are optional on each step and accept [Tooltip.Content](?path=/docs/components-tooltip--docs) props.

Use ProgressStepper when each stage needs a visible title or caption.

**Optional Composition:**
\`\`\`
<ProgressTracker activeStep={2} interactive onStepClick={fn}>
  <ProgressTracker.Step />
</ProgressTracker>
\`\`\``,
      },
    },
  },
  argTypes: {
    // ProgressTracker props
    activeStep: {
      control: 'number',
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    interactive: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onStepClick: {
      control: false,
      table: {
        category: 'Events',
        type: { summary: '(stepIndex: number) => void' },
      },
    },
    steps: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ProgressTrackerStep[]' },
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof ProgressTracker>;

export default meta;

type Story = StoryObj<typeof meta>;

const baseSteps: NonNullable<ProgressTrackerProps['steps']> = [
  { tooltip: { children: 'Step 1' } },
  { tooltip: { children: 'Step 2' } },
  { tooltip: { children: 'Step 3' } },
  { tooltip: { children: 'Step 4' } },
  { tooltip: { children: 'Step 5' } },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Five steps with tooltips. `activeStep={2}` means steps 0–1 are completed, step 2 is active, and steps 3–4 are incomplete.',
      },
    },
  },
  render: (args) => (
    <div className="py-ws-16 w-full">
      <ProgressTracker {...args} />
    </div>
  ),
  args: {
    steps: baseSteps,
    activeStep: 2,
  },
};

export const Statuses: Story = exampleStory(StatusesExample, statusesSource);

export const AllCompleted: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All steps completed — pass `activeStep` equal to the total number of steps.',
      },
    },
  },
  render: (args) => (
    <div className="py-ws-16 w-full">
      <ProgressTracker {...args} />
    </div>
  ),
  args: {
    ...Default.args,
    activeStep: 5,
  },
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Steps render as `<button>` elements. Click any segment to advance to that step.',
      },
    },
  },
  render: function Render(args: ProgressTrackerProps) {
    const [{ activeStep = 1 }, updateArgs] = useArgs<ProgressTrackerProps>();
    const setActiveStep = (nextStep: number) => {
      updateArgs({ activeStep: nextStep });
      args.onStepClick?.(nextStep);
    };
    return (
      <div className="py-ws-16 w-full">
        <ProgressTracker
          {...args}
          activeStep={activeStep}
          interactive
          onStepClick={(stepIndex) => setActiveStep(stepIndex)}
        />
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use `ProgressTracker.Step` children for full control over each step's `status` and `tooltip`.",
      },
    },
  },
  argTypes: {
    steps: { table: { disable: true } },
  },
  render: function Render(args: ProgressTrackerProps) {
    const [{ activeStep = 1 }, updateArgs] = useArgs<ProgressTrackerProps>();
    const setActiveStep = (nextStep: number) => {
      updateArgs({ activeStep: nextStep });
      args.onStepClick?.(nextStep);
    };

    return (
      <div className="py-ws-16 w-full">
        <ProgressTracker
          {...args}
          activeStep={activeStep}
          interactive
          onStepClick={(stepIndex) => setActiveStep(stepIndex)}
        >
          <ProgressTracker.Step status="completed" tooltip={{ children: 'Step 1' }} />
          <ProgressTracker.Step status="completed" tooltip={{ children: 'Step 2' }} />
          <ProgressTracker.Step status="active" tooltip={{ children: 'Step 3' }} />
          <ProgressTracker.Step status="error" tooltip={{ children: 'Step 4' }} />
          <ProgressTracker.Step status="incomplete" tooltip={{ children: 'Step 5' }} />
        </ProgressTracker>
      </div>
    );
  },
  args: {},
};
