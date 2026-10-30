# ProgressStepper

## When to use

- Multi-step flows done in order: checkout, onboarding, a wizard inside a `Modal` or page.
- When each step needs a visible title (and optionally a caption).

## When not to use

- Compact progress without step titles → `ProgressTracker`.
- Progress of a single task or upload → `ProgressBar`.
- Sections the user may visit in any order → `Tabs`.

## Do / Don't

- Do keep `activeStep` in your state and change it in `onStepChange` and on Next / Back.
- Do validate before moving forward; the stepper does not block navigation.
- Don't use it as primary navigation between unrelated pages.
- Don't mix `steps` and children; children win and `steps` is ignored.

## Gotchas

- `activeStep` is 0-based; the first step is `0`.
- In composed mode the root does not compute status or pass `orientation`: every
  `ProgressStepper.Step` needs `step`, `title`, `orientation` and usually `status`. The root only
  sets the connecting lines, the active marker and `onStepChange`. Root `disabled` and
  `allStepsClickable` do not reach composed steps; pass `disabled` per step.
- `onStepChange` only reports a click; nothing moves until you update `activeStep`.
- `ProgressStepper.Icon` is the numbered dot; you rarely need it outside a custom step.
