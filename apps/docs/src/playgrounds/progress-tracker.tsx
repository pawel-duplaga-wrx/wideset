import { ProgressTracker } from '@wideset/react';

import { playground, type Values } from '../lib/playground-kit';

const STEPS = ['Cart', 'Shipping', 'Payment', 'Review', 'Confirmation'];

/** The error switch marks Payment as failed, whatever the active step. */
const steps = (v: Values) =>
  STEPS.map((name) => ({
    ...(v.error && name === 'Payment' ? { status: 'error' as const } : {}),
    tooltip: { children: name },
  }));

/**
 * `interactive` comes from `ProgressTrackerProps`; the step statuses follow `activeStep`,
 * so the active step and the error are content controls written here.
 */
export default playground({
  from: 'ProgressTrackerProps',
  labels: { interactive: 'Clickable steps' },
  group: { interactive: 'Behavior' },
  content: [
    {
      key: 'activeStep',
      label: 'Active step',
      type: 'select',
      options: [
        ...STEPS.map((label, index) => ({ label, value: String(index) })),
        { label: 'All completed', value: String(STEPS.length) },
      ],
      default: '2',
      group: 'State',
    },
    { key: 'error', label: 'Payment failed', type: 'switch', default: false, group: 'State' },
  ],
  render: (v, { props }) => (
    <div className="w-[20rem] max-w-full">
      <ProgressTracker {...props()} steps={steps(v)} activeStep={Number(v.activeStep)} />
    </div>
  ),
  code: (v, { attrs }) => {
    const lines = steps(v).map(({ tooltip, ...rest }) =>
      'status' in rest
        ? `    { status: 'error', tooltip: { children: '${tooltip.children}' } },`
        : `    { tooltip: { children: '${tooltip.children}' } },`,
    );
    const rest = [`activeStep={${v.activeStep}}`, attrs().trim()].filter(Boolean);
    return `<ProgressTracker\n  steps={[\n${lines.join('\n')}\n  ]}\n${rest
      .map((line) => `  ${line}`)
      .join('\n')}\n/>`;
  },
});
