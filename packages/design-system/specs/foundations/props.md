# Props

What repeats across components, and what generated code gets wrong. Per-component props are in
the component's spec and types; this file is the shared vocabulary.

## Handler vocabulary

The handler is not always `onChange`. Check this table first.

| Component                                      | Value            | Controlled prop | Handler receives                                         |
| ---------------------------------------------- | ---------------- | --------------- | -------------------------------------------------------- |
| `TextInput`, `Textarea`                        | `string`         | `value`         | `onChange(event)`                                        |
| `Select`, `TimePicker`                         | `string`         | `value`         | `onValueChange(value)`                                   |
| `ComboBox`                                     | `string`         | `value`         | `onChange(value)`                                        |
| `MultiSelect`                                  | `string[]`       | `value`         | `onValueChange(values)`                                  |
| `FilterButton`                                 | `string[]`       | `value`         | `onChange(values)`, required                             |
| `RadioButtonGroup`, `SegmentedControl`, `Tabs` | `string`         | `value`         | `onValueChange(value)`                                   |
| `Checkbox`, `Switch`                           | `boolean`        | `checked`       | `onCheckedChange(checked)`                               |
| `Slider`                                       | `number[]`       | `value`         | `onValueChange(values)`                                  |
| `DatePicker`                                   | `string`         | `selected`      | `onSelect(day)`                                          |
| `DateRangePicker`                              | `DateRangeValue` | `selected`      | `onSelect(range, preset)`                                |
| `Modal`, `Sidepanel`, `Popup`, `Tooltip`       | `boolean`        | `open`          | `onOpenChange(open)`                                     |
| `Sidebar`                                      | `boolean`        | `collapsed`     | `onCollapsedChange(collapsed)`                           |
| `Pagination`                                   | `number`         | `activePage`    | `onChangeActivePage(page)`, `onChangeItemsPerPage(size)` |

- `Checkbox` is tri-state: `onCheckedChange` can receive `'indeterminate'`. Narrow it before you
  store a boolean.
- Values of `Select`, `RadioButton`, `Tabs` and `SegmentedControl` are strings. Convert numbers and
  ids at the boundary.
- `Checkbox`, `Switch`, `Tabs`, `Slider` and the overlays take Radix props, so Radix's other
  handlers (`onPointerDownOutside`, …) are available too.

## Controlled or uncontrolled

Each stateful component works both ways: `value` plus its handler, or `defaultValue` alone
(`checked` / `defaultChecked`, `open` / `defaultOpen`, `selected` / `defaultSelected`). The
callback fires in both modes. Passing `value` without the handler freezes the control.

Controlling a component does less than it seems. `Modal`'s `open` decides visibility only; the
content and its form state stay yours. Keep the form state above `Modal.Content`, and reset it
when the modal opens, not when it closes (the exit animation would show an empty form), or give
the content a `key`.

## Variant, preset, size

Appearance is split in separate props:

- `variant` is meaning: `primary`, `secondary`, `danger`, `success`, `inverse` on buttons;
  `primary`, `danger` on inputs, where `danger` means invalid.
- `preset` is weight: `filled`, `border`, `ghost` on buttons; `border`, `ghost` on inputs.
- `size` is `xs` to `lg` on buttons and `sm` to `lg` on most other controls. `Tabs`, `Switch` and
  `Checkbox` have only `sm` and `lg`. Check the component's types.

There is no `variant="outline"` or `variant="ghost"`: that is `variant="secondary"
preset="border"` and `preset="ghost"`. There is no `Button` `loading` or `icon` prop: change the
label and disable it, and compose `Button.Icon`.

```tsx
import { Button } from '@wideset/react';

export function Actions() {
  return (
    <>
      <Button variant="secondary" preset="border">
        Cancel
      </Button>
      <Button>Save changes</Button>
    </>
  );
}
```

## Pitfalls

- **Triggers use `asChild`.** `Modal.Trigger`, `Modal.Close`, `Popup.Trigger` and the
  `DropdownMenu` and `Tooltip` triggers render their own element. A `Button` inside one without
  `asChild` is a button in a button.
- **`asChild` for router links.** `Sidebar.Item` and `Button` take `asChild`, so your framework's
  `Link` provides the element.
- **`Select` has two forms.** `options` for a plain list, or composed `Select.Content` and
  `Select.Option` for custom rows. Do not mix them.
- **`TextInput` composes.** `<TextInput value onChange />` is enough for a plain input. To add an
  icon or button, put parts inside it (`TextInput.Prefix`, `TextInput.Suffix`, and a
  `TextInput.Input`). Props you put on the root other than `className`, `size`, `variant`,
  `preset` and `disabled` (`type`, `placeholder`, `aria-label`, `data-*`) are forwarded to the
  input either way.
- **`FormField` connects one control.** It links its single child through `aria-describedby`. For
  a group, use `WrapperComponent="fieldset"`. `errorText` replaces `helperText`, and you still set
  `variant="danger"` on the control.
- **`Sidebar.Section` needs mode wrappers.** See [app-shell](../patterns/app-shell.md).
- **`Toast` is imperative in apps.** Call `showToast` from `useToast()` under one
  `ToastProvider`; render `Toast` directly only in documentation.
- **Icons are component props**, always `icon` ([iconography](iconography.md)); `Avatar` alone
  takes an element.

## Things that always work

- `className` merges through `cn()`, so a later class wins over the default. Use `ws` tokens in it.
- `ref` forwards to the root element (on `TextInput`, to the `<input>`), and rest props (`data-*`, `aria-*`) reach it.
- Every rendered part has a `data-slot` attribute, named after its export (`CardHeader` →
  `card-header`). Target it with `[&_[data-slot=card-header]]:…` before reaching for a fork.
