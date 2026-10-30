# TextInput

## When to use

- The user types a short value that has no fixed list of answers.
- A search or filter field: compose `TextInput.Prefix inner` with `TextInput.Icon`,
  `TextInput.Input type="search"` and `TextInput.Suffix inner` with `TextInput.ClearButton`; this
  replaces `Search`.
- A value with fixed text around it (`https://`, `.com`, a currency or unit) → affixes.

## When not to use

- Several lines of text (comments, descriptions) → `Textarea`.
- One value from a known list → `Select`; from a long list the user filters by typing →
  `ComboBox`.
- Several values from a list → `MultiSelect`.
- A date → `DatePicker`.
- A field with a visible label and helper or error text → wrap it in `FormField`; TextInput
  draws only the control.

## Do / Don't

```tsx
// Do: a labelled field with an error
<FormField label="Email" htmlFor="email" errorText={error}>
  <TextInput id="email" variant={error ? 'danger' : 'primary'} />
</FormField>

// Don't: danger without a reason, or a placeholder used as the label
<TextInput variant="danger" placeholder="Email" />
```

- Don't use the deprecated `Search`; compose the search field from `TextInput`.
- Don't put an icon in an affix without `inner`; boxed affixes are for text.

## Gotchas

- Props split by target: `className` styles the outer frame; every other prop (`id`, `name`,
  `placeholder`, `aria-*`, `data-*`, the `ref`) goes to the `<input>`. A prop set on
  `TextInput.Input` wins over the same prop on the root.
- `onChange` receives the change event, not a string (unlike `ComboBox`).
- `TextInput.ClearButton`: `onClick` runs before clearing (call `event.preventDefault()` to keep
  the value); `onClear` runs after `onChange` has seen the empty value. Validate in `onChange`.
- Composing without `TextInput.Input` renders no input.
- `defaultMotion={false}` turns off focus and shake animations for this field.
