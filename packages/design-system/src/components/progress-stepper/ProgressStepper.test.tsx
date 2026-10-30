import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ProgressStepper } from './ProgressStepper';
import type { ProgressStepperProps } from './ProgressStepper.types';

const steps = [
  { title: 'Step 1', caption: 'Caption 1' },
  { title: 'Step 2', caption: 'Caption 2' },
  { title: 'Step 3', caption: 'Caption 3' },
  { title: 'Step 4', caption: 'Caption 4' },
];

const getSteps = () => screen.getAllByRole('listitem');
const getStepByText = (text: string) => screen.getByText(text, { selector: 'span' });
const getAllStepButtons = () => screen.getAllByRole('button');

describe('ProgressStepper', () => {
  it('renders steps with titles and captions', () => {
    render(<ProgressStepper steps={steps} />);

    const items = getSteps();
    expect(items).toHaveLength(4);

    for (let i = 1; i <= 4; i++) {
      expect(getStepByText(`Step ${i}`)).toHaveTextContent(`Step ${i}`);
      expect(getStepByText(`Caption ${i}`)).toHaveTextContent(`Caption ${i}`);
    }
  });

  it('pass correct step 0 on click in horizontal orientation', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ProgressStepper steps={steps} onStepChange={handleChange} />);

    const [button1] = getAllStepButtons();

    await user.click(button1);
    expect(handleChange).toHaveBeenCalledWith(0);
  });

  it('pass correct step 1 on click in vertical orientation', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <ProgressStepper
        allStepsClickable
        orientation="vertical"
        steps={steps}
        onStepChange={handleChange}
      />,
    );

    const [, button2] = getAllStepButtons();
    await user.click(button2);
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('updates disabled states only after parent updates activeStep (controlled)', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const utils = render(
      <ProgressStepper activeStep={3} steps={steps} onStepChange={handleChange} />,
    );

    let [button1, button2, button3] = getAllStepButtons();

    expect(button1).not.toBeDisabled();
    expect(button2).not.toBeDisabled();
    expect(button3).not.toBeDisabled();

    await user.click(button2);
    expect(handleChange).toHaveBeenCalledWith(1);

    utils.rerender(<ProgressStepper activeStep={1} steps={steps} onStepChange={handleChange} />);

    [button1, button2, button3] = getAllStepButtons();
    const [, , , button4] = getAllStepButtons();

    expect(button1).not.toBeDisabled();
    expect(button2).not.toBeDisabled();
    expect(button3).toBeDisabled();
    expect(button4).toBeDisabled();
  });

  it('renders disabled steps when allStepsClickable is false', () => {
    render(<ProgressStepper steps={steps} />);

    const [button1, button2, button3, button4] = getAllStepButtons();

    expect(button1).not.toBeDisabled();
    expect(button2).toBeDisabled();
    expect(button3).toBeDisabled();
    expect(button4).toBeDisabled();
  });

  it('renders disabled steps when activeStep is 1 and allStepsClickable is false', () => {
    render(<ProgressStepper activeStep={1} steps={steps} />);

    const [button1, button2, button3, button4] = getAllStepButtons();

    expect(button1).not.toBeDisabled();
    expect(button2).not.toBeDisabled();
    expect(button3).toBeDisabled();
    expect(button4).toBeDisabled();
  });

  it('renders disabled steps when activeStep is 1 and allStepsClickable is true', () => {
    render(<ProgressStepper activeStep={1} allStepsClickable steps={steps} />);

    const [button1, button2, button3, button4] = getAllStepButtons();

    expect(button1).not.toBeDisabled();
    expect(button2).not.toBeDisabled();
    expect(button3).not.toBeDisabled();
    expect(button4).not.toBeDisabled();
  });

  it('renders enabled buttons when allStepsClickable is true', () => {
    render(<ProgressStepper allStepsClickable steps={steps} />);
    for (const button of getAllStepButtons()) {
      expect(button).not.toBeDisabled();
    }
  });

  it('renders children instead of steps when steps are not provided', () => {
    render(
      <ProgressStepper>
        <div>Custom Child</div>
      </ProgressStepper>,
    );

    expect(screen.getByText('Custom Child')).toBeInTheDocument();
  });
});

describe('ProgressStepper Snapshots', () => {
  it('matches snapshot for default ProgressStepper', () => {
    const { container } = render(<ProgressStepper steps={steps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for all orientation × clickability combinations', () => {
    const orientations = ['horizontal', 'vertical'] as const;
    const clickability = [false, true] as const;

    orientations.forEach((orientation) => {
      clickability.forEach((allStepsClickable) => {
        const { container } = render(
          <ProgressStepper
            steps={steps}
            orientation={orientation}
            allStepsClickable={allStepsClickable}
          />,
        );

        expect(container.firstChild).toMatchSnapshot(
          `ProgressStepper with ${orientation} orientation and ${
            allStepsClickable ? 'all steps clickable' : 'non-clickable future/current'
          }`,
        );
      });
    });
  });

  it('matches snapshot for error state', () => {
    const stepsWithError: NonNullable<ProgressStepperProps['steps']> = [
      { title: 'Step 1', caption: 'Caption 1' },
      { title: 'Step 2', caption: 'Caption 2', status: 'error' },
      { title: 'Step 3', caption: 'Caption 3' },
      { title: 'Step 4', caption: 'Caption 4', status: 'error' },
    ];
    const { container } = render(<ProgressStepper steps={stepsWithError} />);
    expect(container.firstChild).toMatchSnapshot('ProgressStepper with error on steps 1 and 3');
  });

  it('matches snapshot for controlled activeStep values', () => {
    const { container, rerender } = render(<ProgressStepper steps={steps} activeStep={0} />);
    expect(container.firstChild).toMatchSnapshot('ProgressStepper controlled activeStep=0');

    rerender(<ProgressStepper steps={steps} activeStep={2} />);
    expect(container.firstChild).toMatchSnapshot('ProgressStepper controlled activeStep=2');
  });

  it('matches snapshot for custom className on root', () => {
    const { container } = render(<ProgressStepper steps={steps} className="custom-classname" />);
    expect(container.firstChild).toMatchSnapshot('ProgressStepper with custom className');
  });

  it('matches snapshot for children usage', () => {
    const { container } = render(
      <ProgressStepper>
        <ProgressStepper.Step
          step={0}
          status="completed"
          orientation="horizontal"
          title="Custom 1"
          caption="C1"
        />
        <ProgressStepper.Step
          step={1}
          status="active"
          orientation="horizontal"
          title="Custom 2"
          caption="C2"
        />
        <ProgressStepper.Step
          step={2}
          status="incomplete"
          orientation="horizontal"
          title="Custom 3"
          caption="C3"
        />
      </ProgressStepper>,
    );

    expect(container.firstChild).toMatchSnapshot('ProgressStepper with composed Steps as children');
  });

  it('matches snapshot for vertical composed steps (interactive buttons)', () => {
    const { container } = render(
      <ProgressStepper orientation="vertical">
        <ProgressStepper.Step
          step={0}
          status="completed"
          orientation="vertical"
          title="V1"
          caption="VC1"
        />
        <ProgressStepper.Step
          step={1}
          status="active"
          orientation="vertical"
          title="V2"
          caption="VC2"
        />
        <ProgressStepper.Step
          step={2}
          status="incomplete"
          orientation="vertical"
          title="V3"
          caption="VC3"
        />
      </ProgressStepper>,
    );

    expect(container.firstChild).toMatchSnapshot('ProgressStepper vertical with composed Steps');
  });

  it('matches snapshot for children fallback (no steps provided)', () => {
    const { container } = render(
      <ProgressStepper steps={[]}>
        <li>
          <button type="button">Custom Child</button>
        </li>
      </ProgressStepper>,
    );
    expect(container.firstChild).toMatchSnapshot('ProgressStepper with children fallback');
  });
});

describe('data-slot', () => {
  it('marks each part with data-slot', () => {
    render(<ProgressStepper steps={steps} activeStep={1} />);

    expect(screen.getByRole('list')).toHaveAttribute('data-slot', 'progress-stepper');
    for (const item of getSteps()) {
      expect(item).toHaveAttribute('data-slot', 'progress-stepper-step');
      expect(item.querySelector('[data-slot="progress-stepper-icon"]')).toBeInTheDocument();
    }
  });
});

describe('Accessibility', () => {
  it('does not repeat the visible title as a native tooltip on the icon', () => {
    const { container } = render(<ProgressStepper steps={steps} />);

    expect(container.querySelector('[data-slot="progress-stepper-icon"][title]')).toBeNull();
  });

  it('names an interactive icon "Step n" by default', () => {
    render(<ProgressStepper.Icon step={1} interactive />);

    expect(screen.getByRole('button', { name: 'Step 2' })).toBeInTheDocument();
  });

  it('names an interactive icon with stepAriaLabel', () => {
    render(
      <ProgressStepper.Icon step={1} interactive stepAriaLabel={(step) => `Krok ${step + 1}`} />,
    );

    expect(screen.getByRole('button', { name: 'Krok 2' })).toBeInTheDocument();
  });
});
