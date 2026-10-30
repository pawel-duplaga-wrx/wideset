# FileUpload

## When to use

- The user attaches files to a form or a record: documents, images, imports.
- With `FileItem` rows beneath it for the picked files and their upload state.

## When not to use

- Showing files that are already attached, with no way to add more → `FileItem` rows alone.
- A button that starts an upload flow elsewhere (a modal, another page) → `Button`.

## Do / Don't

```tsx
// Do: the picker opens through onBrowse
<FileUpload zoneProps={getRootProps()} inputProps={getInputProps()} onBrowse={open} />

// Don't: a click handler in zoneProps; it is dropped and nothing opens
<FileUpload zoneProps={{ onClick: open }} onBrowse={() => {}} />
```

- Don't put the file list inside the zone; `FileItem` rows go beneath it.

## Gotchas

- FileUpload holds no files, validation or upload progress; it only draws the trigger. Keep files
  in your state and render a `FileItem` for each.
- `zoneProps` keeps only drag props: `onClick`, `onKeyDown`, `onKeyUp`, `tabIndex` and `role` are
  dropped. Opening the picker always goes through `onBrowse`.
- Without `inputProps` there is no file input at all; `onBrowse` must open a picker some other way.
- With react-dropzone, `useFsAccessApi: false` keeps `open()` working inside iframes.
