# Inputs

Controls where the user enters or picks a value in a form: typed text, one or several choices
from a list, and files. Each control draws only itself; `FormField` adds the label, the helper
text and the validation message and links them to the control for screen readers. Validation
logic is always yours: set `variant="danger"` on the control and `errorText` on its `FormField`
after blur or submit. The label and helper text inside FormField (`FieldLabel`, `HelperText`) are
internal parts, not exported from `@wideset/react`; reach them only through FormField's
props.

## Pick the right one

- [TextInput](text-input.md): one line of free text (name, email, amount, URL); also the search
  field, composed with an icon and a clear button.
- [Textarea](textarea.md): free text over several lines (comments, descriptions).
- [Search](search.md): deprecated; compose a search field from `TextInput`.
- [Select](select.md): exactly one value from a known list; `hasSearch` for long lists.
- [MultiSelect](multi-select.md): several values from a known list, shown as tags or a count.
- [ComboBox](combo-box.md): one value found by typing, optionally a value not in the list.
- [FormField](form-field.md): label, helper and error text around any control above.
- [FileUpload](file-upload.md): the dropzone or button that adds files; your file library owns
  them.
- [FileItem](file-item.md): one row per file under FileUpload, with upload state and remove.

Choosing among the list controls: one value and the user browses → `Select`; one value and the
user knows what to type, or may type something new → `ComboBox`; several values → `MultiSelect`;
two to five options that should stay visible → `RadioButton.Group` or `Checkbox.Group`.
