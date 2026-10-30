import type { VariantProps } from 'class-variance-authority';
import type {
  ComponentType,
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
} from 'react';

import type { progressStepperIconVariants } from './ProgressStepper.variants';

export type ProgressStepperOrientation = 'horizontal' | 'vertical';

/** A sequence of named steps showing workflow progress. */
export type ProgressStepperProps = Omit<HTMLAttributes<HTMLOListElement>, 'children'> & {
  /** Array-driven step definitions. Each entry requires a `title`, optionally a `caption`, and optionally a `status` to override the computed state. Mutually exclusive with `children`. */
  steps?: Array<{
    /** Title displayed for this item. */
    title: string;
    /** Supporting caption displayed below the title. */
    caption?: string;
    /** Semantic status used for the icon and colors. */
    status?: ProgressStepperIconProps['status'];
  }>;
  /** The 0-based index of the currently active step. Steps before this index are marked completed, steps after are incomplete. Set to the length of `steps` to mark all steps complete. */
  activeStep?: number;
  /** Layout direction of the stepper. */
  orientation?: ProgressStepperOrientation;
  /** Called with the 0-based step index when the user clicks a step. */
  onStepChange?: (step: number) => void;
  /** When `true`, future steps are also clickable, not just past and active steps. */
  allStepsClickable?: boolean;
  /** Disables all step interactions. */
  disabled?: boolean;
  /** Compose steps manually using `ProgressStepper.Step`. Takes precedence over `steps`. */
  children?: ReactNode;
};

/** An icon rendered within `ProgressStepper`. */
export type ProgressStepperIconProps = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> & {
  /** Zero-based step index. */
  step: number;
  /** Layout direction of the component. */
  orientation?: ProgressStepperOrientation;
  /** Allows users to activate steps. */
  interactive?: boolean;
  /** Called with the zero-based step index when the step is activated. */
  onClick?: (step: number) => void;
  /** Accessible name of the icon button when `interactive`, from its zero-based step. Defaults to `Step 1`, `Step 2`, … */
  stepAriaLabel?: (step: number) => string;
} & VariantProps<typeof progressStepperIconVariants>;

/** An individual stage in the progress indicator. */
export type ProgressStepperStepProps = Omit<HTMLAttributes<HTMLLIElement>, 'children' | 'onClick'> &
  Omit<ProgressStepperIconProps, 'interactive' | 'title' | 'orientation' | 'stepAriaLabel'> & {
    /** Title displayed for this item. */
    title: string;
    /** Supporting caption displayed below the title. */
    caption?: string;
    /** Layout direction of the component. */
    orientation: ProgressStepperOrientation;
  };

export type ProgressStepperWithSubComponents = ForwardRefExoticComponent<
  PropsWithoutRef<ProgressStepperProps> & RefAttributes<HTMLOListElement>
> & {
  Step: ComponentType<ProgressStepperStepProps>;
  Icon: ComponentType<ProgressStepperIconProps>;
};
