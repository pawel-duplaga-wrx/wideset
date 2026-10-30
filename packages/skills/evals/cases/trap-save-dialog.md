---
name: trap-save-dialog
requires: Modal, Button, TextInput
traps: modal-close-async
---

Build a profile page with an Edit profile action that opens a dialog with name and job title fields. Saving takes a moment and can fail: while it runs the person cannot submit twice, a failure shows an error in the dialog so they can retry without retyping, and success closes it.
