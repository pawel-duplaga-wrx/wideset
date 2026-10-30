# Form page

> A page (or panel) where the user fills fields, gets told what to fix, and saves or cancels.

## Problem

Every field needs a label, help, an error that screen readers hear, and an error look on the
control. The form needs one place for a save failure, a clear submit, and confirmation after.
Wideset has no `Form` component: a native `<form>` holds `FormField`s, each wrapping one control.

## Structure

```
form (noValidate, onSubmit)                     — flex column, gap-ws-11
├ InlineAlert status="error" persistent         — only after a failed save, first
├ FormField label htmlFor required errorText    — one per field
│ └ TextInput | Textarea | Select (id, name, required, variant)
├ FormField WrapperComponent="fieldset"         — a group of Checkbox / RadioButton, named by aria-labelledby
└ div (actions, right-aligned)                  — Cancel (secondary border) + submit (primary)
on success → useToast().showToast({ status: 'success' })
```

## Example

```tsx
import {
  Button,
  FormField,
  InlineAlert,
  Select,
  Textarea,
  TextInput,
  useToast,
} from '@wideset/react';
import { type FormEvent, useState } from 'react';

type Errors = { name?: string; email?: string };

export function ProjectForm({
  onSave,
  onCancel,
}: {
  onSave: (data: FormData) => Promise<void>;
  onCancel: () => void;
}) {
  const { showToast } = useToast();
  const [errors, setErrors] = useState<Errors>({});
  const [saveFailed, setSaveFailed] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Errors = {};
    if (!String(data.get('name')).trim()) next.name = 'Enter a project name.';
    if (!/^\S+@\S+\.\S+$/.test(String(data.get('email'))))
      next.email = 'Enter an email address like name@company.com.';
    setErrors(next);
    if (next.name || next.email) {
      document.getElementById(next.name ? 'name' : 'email')?.focus();
      return;
    }
    setSaving(true);
    setSaveFailed(false);
    try {
      await onSave(data);
      showToast({ content: 'Project created', status: 'success' });
    } catch {
      setSaveFailed(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="gap-ws-11 flex max-w-[40rem] flex-col">
      {saveFailed && (
        <InlineAlert
          status="error"
          persistent
          title="Project not saved"
          message="Check your connection and try again."
        />
      )}
      <FormField label="Project name" htmlFor="name" required errorText={errors.name}>
        <TextInput id="name" name="name" required variant={errors.name ? 'danger' : 'primary'} />
      </FormField>
      <FormField
        label="Owner email"
        htmlFor="email"
        required
        helperText="We send status updates here."
        errorText={errors.email}
      >
        <TextInput
          id="email"
          name="email"
          type="email"
          required
          placeholder="name@company.com"
          variant={errors.email ? 'danger' : 'primary'}
        />
      </FormField>
      <FormField label="Team" htmlFor="team">
        <Select
          id="team"
          name="team"
          placeholder="Choose a team"
          options={[
            { value: 'design', label: 'Design' },
            { value: 'engineering', label: 'Engineering' },
          ]}
        />
      </FormField>
      <FormField label="Description" htmlFor="description" helperText="Shown on the project card.">
        <Textarea id="description" name="description" rows={4} />
      </FormField>
      <div className="gap-ws-5 flex justify-end">
        <Button variant="secondary" preset="border" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? 'Creating…' : 'Create project'}
        </Button>
      </div>
    </form>
  );
}
```

## Variants

- **Settings page.** `variant="horizontal"` on every `FormField`: label column on the left,
  helper text under the label. One layout per form.
- **Grouped choices.** `WrapperComponent="fieldset"` on `FormField` with one `CheckboxGroup` or
  `RadioButtonGroup` inside. The label does not name the group by itself (`FormField` renders no
  `<legend>`): give the label an `id` and point the group at it, or the group has no accessible name.

  ```tsx
  <FormField label="Notify me by" id="notify-label" WrapperComponent="fieldset">
    <CheckboxGroup aria-labelledby="notify-label">
      <Checkbox label="Email" description="A daily digest" />
      <Checkbox label="SMS" description="Security alerts only" />
    </CheckboxGroup>
  </FormField>
  ```

- **Long forms.** Split into `Card`s per topic (one `Card.Title` each), or label sub-sections
  with `Divider text="…" textAlign="left"` plus a real heading. Optional fields can go under a
  `Divider lineStyle="dashed" text="Optional" textAlign="left"`.
- **Form in an overlay.** The same fields inside `Sidepanel.Content` with the actions in
  `Sidepanel.Footer`, or `Modal.Body` / `Modal.Footer` for two or three fields. Give the
  `<form>` an `id` and the submit button `form="<id>"` when the button sits in a footer outside it.
  In a `Modal` the `<form>` can instead wrap `Modal.Header`, `Modal.Body` and `Modal.Footer`
  inside `Modal.Content`, so Enter submits. Hold the field state above the modal and reset it when
  it opens ([composition](composition.md)).
- **Warnings.** FormField has no warning state; put advisory text in `helperText`.

## Behaviour

**When to validate.**

| Moment          | Do                                                                                      |
| --------------- | --------------------------------------------------------------------------------------- |
| Typing          | Nothing, except clear an error that is now fixed, or a live rule (a password checklist) |
| Leaving a field | Check the format, once the user has typed something                                     |
| Submit          | Check everything; focus the first invalid field                                         |
| Server reply    | Map each error back to its field; what has no field goes in the `InlineAlert`           |

Never show an error on a field the user has not touched. For a long form, add an `InlineAlert`
above it that lists what to fix.

**Submitting.**

- The primary button names the outcome ("Create project"), not "Submit".
- A real `<form>` and a `type="submit"` button give Enter-to-submit. Every other `Button` inside
  the form needs `type="button"`.
- While saving, disable the submit button and keep every field's value. Never clear the form on
  failure. On success show a `Toast`, or navigate to what was made.

**Unsaved changes.**

- Compare the values with the saved ones; do not set a flag on the first keystroke.
- Show the save footer, or enable Save, only while something differs.
- Leaving with changes: `beforeunload` for closing the tab, your router's blocker for
  navigation. A clean form closes silently.
- In a `Modal`, `persistent` (on `Modal.Content`) plus a confirm on Cancel. `Sidepanel` has no
  `persistent`: control `open` and ask in `onOpenChange` before closing.
- An autosaving form shows its state ("Saved 2 min ago") and never warns.

**Fields.**

- One column. Ask only for what you need; each field costs completions.
- Mark the exception: when most fields are required, mark the optional ones with `FormField`
  `suffix="(optional)"`; otherwise use `required`.
- Set the `type` and `autoComplete` of each input (`email`, `tel`, `organization`): they change
  the mobile keyboard and autofill. Size a field by its content: a postcode is short.
- Fewer than five visible options → `RadioButtonGroup`; more → `Select`
  (`hasSearch` for long lists). A `Switch` applies at once, a `Checkbox` on submit.

**Long forms.** Split into steps (`ProgressStepper`) only when the steps are truly separate, and
keep the input when the user goes back. A sticky footer belongs only on long pages: `z-ws-sticky`.

## Accessibility

- `htmlFor` on `FormField` must equal the control's `id`; that is the label link.
- `FormField` sets `aria-describedby` (helper or error) and `aria-invalid` on a single child
  control. It cannot do this through a wrapper `div` or a Fragment.
- `required` on `FormField` only draws the asterisk; set `required` on the control too.
- The red look is yours: `errorText` on `FormField` never turns the border red. Every field that can
  show an error sets `variant={error ? 'danger' : 'primary'}` on its control (`TextInput`,
  `Textarea`, `Select`, `Checkbox`), not only the examples above that have `errorText` today.
- A `CheckboxGroup` or `RadioButtonGroup` needs `aria-labelledby` (the label's `id`) or `aria-label`.
- After a failed submit, move focus to the first invalid field. A save failure in an
  `InlineAlert status="error"` is announced (`role="alert"`).
- `noValidate` keeps browser bubbles from competing with the field errors.

## Anti-patterns

- `<Button>` without `type="submit"` as the submit: Button defaults to `type="button"` and
  won't submit.
- Errors only in a toast or a top banner; field errors belong to the field (`errorText`).
- A disabled submit button as the only hint that something is wrong; validate on submit and
  say what to fix.
- `placeholder` as the label.
- Error text that blames ("Invalid input"); say how to fix it ("Enter an email address like …").
- Hand-made labels (`<label>` + `<p>`) next to a control instead of `FormField`.
