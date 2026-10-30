# Textarea

## When to use

- The answer is a sentence or more and the user may press Enter for a new line.

## When not to use

- One line of text (a name, an email, a search) → `TextInput`.
- Rich text with formatting: Textarea has no formatting bar; there is no Wideset rich-text
  editor.
- A label, hint or error around the field → wrap it in `FormField`; Textarea draws only the
  control.

## Do / Don't

```tsx
// Do
<FormField label="Reason" htmlFor="reason" errorText="Tell us why you are leaving.">
  <Textarea id="reason" variant="danger" required />
</FormField>

// Don't: a one-line value in a textarea
<Textarea rows={1} placeholder="Email" />
```

- Don't mix sizes between Textarea and the TextInputs in the same form.

## Gotchas

- `className` styles the outer frame; `contentClassName` styles the `<textarea>`. All other props
  and the `ref` go to the `<textarea>`.
- There is no `preset` (no `ghost`), unlike TextInput.
- Passing `cols` makes the field size to its columns instead of filling the width.
- An explicit `aria-invalid` prop wins over the one `danger` sets.
