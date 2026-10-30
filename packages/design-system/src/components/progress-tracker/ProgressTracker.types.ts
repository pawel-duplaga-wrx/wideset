import type { VariantProps } from 'class-variance-authority';
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import type { TooltipContentProps } from '../tooltip/Tooltip.types';
import type { progressTrackerStepVariants } from './ProgressTracker.variants';
import type { ProgressTrackerStep as ProgressTrackerStepComponent } from './ProgressTrackerStep';

type ProgressTrackerStepStatus = VariantProps<typeof progressTrackerStepVariants>['status'];

export interface ProgressTrackerStep {
  /** Visual status of the step segment. When omitted, status is derived automatically from `activeStep`. */
  status?: ProgressTrackerStepStatus;
  /** Tooltip shown on hover. Accepts Tooltip.Content props. */
  tooltip?: TooltipContentProps;
}

/** An individual stage in the progress indicator. */
export type ProgressTrackerStepProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onClick'
> &
  ProgressTrackerStep & {
    /** @internal Index injected by ProgressTracker — do not set manually. */
    stepIndex?: number;
  };

/** A compact row of progress segments with optional tooltips. */
export type ProgressTrackerProps = HTMLAttributes<HTMLDivElement> & {
  /** Array-driven step definitions. Each entry may have an optional `status` override and `tooltip`. Mutually exclusive with `children`. */
  steps?: ProgressTrackerStep[];
  /** Compose steps manually using `ProgressTracker.Step`. Takes precedence over `steps`. */
  children?: ReactNode;
  /** Index of the currently active step. Steps before it are marked completed; steps after are incomplete. Clamped to `[0, stepsCount]`. */
  activeStep?: number;
  /** Renders each step as a `<button>`. Enables hover/active states and `onStepClick`. */
  interactive?: boolean;
  /** Callback fired when a step is clicked. Receives the zero-based `stepIndex`. */
  onStepClick?: (stepIndex: number) => void;
  /** Accessible name of each interactive step button, from its zero-based index. Defaults to `Step 1`, `Step 2`, … */
  stepAriaLabel?: (stepIndex: number) => string;
};

export type ProgressTrackerContextValue = {
  activeStep: number;
  interactive: boolean;
  onStepClick?: (stepIndex: number) => void;
  stepAriaLabel: (stepIndex: number) => string;
};

export type ProgressTrackerWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<ProgressTrackerProps> & RefAttributes<HTMLDivElement>
> & {
  Step: typeof ProgressTrackerStepComponent;
};
