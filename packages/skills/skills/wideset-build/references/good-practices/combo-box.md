# ComboBox

## When to use

- A long list the user knows by name (cities, customers, projects): typing is faster than
  scrolling.
- Suggestions where a value outside the list is allowed (a new tag, a free-text city).
- With `disallowCustomValue`: a long list where only existing options are valid, chosen by typing.

## When not to use

- A short or unfamiliar list the user needs to browse → `Select` (add `hasSearch` if long).
- Several values → `MultiSelect`.
- Free text with no suggestions → `TextInput`.
- A search box that filters a page, not a value → a composed `TextInput` with `type="search"`.

## Do / Don't

```tsx
// Do: inside FormField, labelled by the label's id
<FormField id="city-label" label="City" errorText={error}>
  <ComboBox aria-labelledby="city-label" options={cities} variant={error ? 'danger' : 'primary'} />
</FormField>

// Don't: rely on htmlFor, the combobox stays unnamed
<FormField label="City" htmlFor="city">
  <ComboBox id="city" options={cities} />
</FormField>
```

## Gotchas

- `onChange` receives a string, not an event, and not `onValueChange` as on Select.
- With custom values allowed, `onChange` fires on every keystroke with the partial text. Validate
  on blur or submit, not in `onChange`.
- Every `ComboBox.Item` `value` needs a matching `options` entry; without one the item has no
  label and a click only closes the list, it selects nothing.
- In simple mode, children that are not `ComboBox.Trigger` / `ComboBox.Content` render inside the
  trigger (a `ComboBox.Prefix`). Once you render `ComboBox.Trigger`, put `size`, `preset`,
  `variant`, `placeholder`, `className` and `aria-*` on it, not on the root, and set `hasPrefix`
  when it holds a `ComboBox.Prefix` (simple mode detects it).
- No `name`: nothing is submitted with a native form. Read the value from state.
- The trigger has a fixed default width; `className="w-full"` fills a form column.
