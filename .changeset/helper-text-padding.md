---
'@wideset/react': patch
---

HelperText has Figma's `py-ws-3` padding by default. FormField and ProgressBar keep their current distance to the helper text (6px below a control, 8px below a horizontal label, 12px below a progress bar); each now has 4px more space under the helper text. FormField's control column uses the `ws-2` token instead of `gap-[0.375rem]`.
