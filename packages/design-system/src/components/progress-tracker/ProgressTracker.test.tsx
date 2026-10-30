import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ProgressTracker } from './ProgressTracker';

describe('ProgressTracker', () => {
  const steps = [
    { status: 'incomplete' as const, tooltip: { children: 'Step 1' } },
    { status: 'completed' as const, tooltip: { children: 'Step 2' } },
    { status: 'error' as const, tooltip: { children: 'Step 3' } },
  ];

  it('renders with default props', () => {
    const { container } = render(<ProgressTracker steps={steps} />);
    const progressTracker = container.querySelector('[role="progressbar"]');
    expect(progressTracker).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProgressTracker className="custom-class" steps={steps} activeStep={1} />,
    );
    const progressRoot = container.querySelector('.custom-class');
    expect(progressRoot).toBeInTheDocument();
  });

  it('clamps activeStep below 0', () => {
    const { container } = render(<ProgressTracker steps={steps} activeStep={-5} />);
    const progressRoot = container.querySelector('[role="progressbar"]');
    expect(progressRoot).toHaveAttribute('aria-valuenow', '0');
  });

  it('clamps activeStep above steps length', () => {
    const { container } = render(<ProgressTracker steps={steps} activeStep={10} />);
    const progressRoot = container.querySelector('[role="progressbar"]');
    expect(progressRoot).toHaveAttribute('aria-valuenow', '3');
  });

  it('calls onStepClick when interactive steps are clicked', async () => {
    const user = userEvent.setup();
    const handleStepClick = vi.fn();
    const { container } = render(
      <ProgressTracker steps={steps} interactive onStepClick={handleStepClick} />,
    );

    const buttons = container.querySelectorAll('button');
    await user.click(buttons[1]);

    expect(handleStepClick).toHaveBeenCalledTimes(1);
    expect(handleStepClick).toHaveBeenCalledWith(1);
  });
});

// Snapshot Tests
describe('ProgressTracker Snapshots', () => {
  const steps = [
    { status: 'incomplete' as const, tooltip: { children: 'Step 1' } },
    { status: 'completed' as const, tooltip: { children: 'Step 2' } },
    { status: 'error' as const, tooltip: { children: 'Step 3' } },
  ];

  it('matches snapshot for default progress tracker', () => {
    const { container } = render(<ProgressTracker steps={steps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for active steps', () => {
    const { container } = render(<ProgressTracker steps={steps} activeStep={2} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for tracker without tooltips', () => {
    const { container } = render(
      <ProgressTracker
        steps={[{ status: 'incomplete' }, { status: 'completed' }, { status: 'error' }]}
        activeStep={1}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('data-slot', () => {
  it('marks each part with data-slot', () => {
    const { getByRole } = render(<ProgressTracker steps={[{}, {}, {}]} activeStep={1} />);

    const root = getByRole('progressbar');
    expect(root).toHaveAttribute('data-slot', 'progress-tracker');
    expect(root.querySelectorAll('[data-slot="progress-tracker-step"]')).toHaveLength(3);
  });
});

describe('Semantics', () => {
  it('is a progressbar when the steps are not interactive', () => {
    const { getByRole } = render(
      <ProgressTracker steps={[{}, {}, {}]} activeStep={1} aria-label="Onboarding" />,
    );

    expect(getByRole('progressbar', { name: 'Onboarding' })).toHaveAttribute('aria-valuenow', '1');
  });

  it('is a group of step buttons, not a progressbar, when interactive', () => {
    const { getByRole, queryByRole } = render(
      <ProgressTracker steps={[{}, {}, {}]} activeStep={1} interactive aria-label="Onboarding" />,
    );

    expect(queryByRole('progressbar')).toBeNull();
    const group = getByRole('group', { name: 'Onboarding' });
    expect(group).not.toHaveAttribute('aria-valuenow');
    expect(getByRole('button', { name: 'Step 2' })).toHaveAttribute('aria-current', 'step');
  });

  it('names step buttons with stepAriaLabel', () => {
    const { getByRole } = render(
      <ProgressTracker
        steps={[{}, {}]}
        interactive
        aria-label="Onboarding"
        stepAriaLabel={(index) => `Krok ${index + 1}`}
      />,
    );

    expect(getByRole('button', { name: 'Krok 2' })).toBeInTheDocument();
  });
});
