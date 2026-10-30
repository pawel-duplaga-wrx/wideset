# ProgressTracker

## When to use

- A short, ordered flow where a glance is enough: checkout (Cart, Shipping, Payment, Review,
  Confirmation), onboarding, a wizard header.
- Space is tight and step names can live in tooltips.

## When not to use

- Each step needs a visible title or caption → `ProgressStepper`.
- Progress is a percentage, not steps → `ProgressBar`.

## Do / Don't

```tsx
// Do: real names for interactive steps
<ProgressTracker interactive stepAriaLabel={(i) => stepNames[i]} … />

// Don't: status only, no activeStep (screen readers hear 0)
<ProgressTracker steps={[{ status: 'completed' }, { status: 'active' }, {}]} />

// Don't: onStepClick without interactive (steps are not buttons, never fires)
<ProgressTracker onStepClick={setStep} steps={steps} />
```

## Gotchas

- `onStepClick` only fires with `interactive`.
- `activeStep` is clamped to `[0, step count]`; it is controlled only, there is no internal state.
- Do not set `stepIndex` on `ProgressTracker.Step`; the parent injects it.
- `ProgressTracker.Step` throws outside `ProgressTracker`.
