# Confirm a destructive action

> Ask once, clearly, before something is deleted or lost, and make the safe choice the easy one.

## Problem

Deleting, archiving with loss of access, or discarding unsaved work can't be undone. The user
needs to see what will be lost and choose between a clearly marked destructive button and a
safe way out. The action is often async, so the dialog must stay open until it finishes or fails.

## Which dialog

| Situation                                                       | Use                                                                           |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Ordinary destructive confirmation; may need a body with details | `Modal`                                                                       |
| Same, but the decision needs a stronger visual signal           | `StatusModal` (`status="neutral"`, or `notice` to warn before it is too late) |
| Undoable action (archive, remove from list)                     | No dialog: act, then `Toast` with an Undo action                              |
| Destructive item in a menu                                      | `DropdownMenuItem` / `ListItem` `variant="danger"`, then the dialog           |

Never use `StatusModal status="error"` for a confirmation; `error` reports a failure.

## Structure

```
Modal open onOpenChange                   — controlled, so it stays open while the request runs
└ Modal.Content persistent={pending}      — no Escape / outside-click while deleting
  ├ Modal.Header > Modal.Title (a question) + Modal.Description (what is lost)
  ├ Modal.Body                            — consequences; InlineAlert on failure
  └ Modal.Footer
    ├ Modal.Close asChild > Button secondary border   — Cancel, first
    └ Button variant="danger"                          — the action, named with the verb
```

## Example

```tsx
import { Button, InlineAlert, Modal, useToast } from '@wideset/react';
import { useState } from 'react';

export function DeleteProject({ name, onDelete }: { name: string; onDelete: () => Promise<void> }) {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function confirm() {
    setPending(true);
    setFailed(false);
    try {
      await onDelete();
      setOpen(false);
      showToast({ content: `“${name}” deleted`, status: 'success' });
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <Modal open={open} onOpenChange={(next) => !pending && setOpen(next)}>
      <Modal.Trigger asChild>
        <Button variant="danger" preset="border">
          Delete project
        </Button>
      </Modal.Trigger>
      <Modal.Content persistent={pending}>
        <Modal.Header>
          <Modal.Title>Delete “{name}”?</Modal.Title>
          <Modal.Description>
            All tasks, files and comments in it will be deleted.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body>
          {failed ? (
            <InlineAlert
              status="error"
              persistent
              message="The project was not deleted. Check your connection and try again."
            />
          ) : (
            'This cannot be undone.'
          )}
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="secondary" preset="border" disabled={pending}>
              Cancel
            </Button>
          </Modal.Close>
          <Button variant="danger" onClick={confirm} disabled={pending}>
            {pending ? 'Deleting…' : 'Delete project'}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
```

## Variants

- **StatusModal.** Same flow with `StatusModal` (`open`, `onOpenChange`, `status`) >
  `StatusModal.Content` > `StatusModal.Title`, `StatusModal.Body`, `StatusModal.Footer`; close
  with `StatusModal.Close asChild`. Footer buttons are `size="sm"` there.
  `orientation="vertical"` centres a short message.
- **Synchronous action.** Wrap the danger button in `Modal.Close asChild` too; no pending state.
- **High-stakes deletes** (a workspace, an account). Ask the user to type the name in a
  `FormField` + `TextInput` in `Modal.Body`, and keep the danger button `disabled` until it
  matches.
- **Discard unsaved changes.** `persistent` always on, so only the buttons close it; the safe
  button says "Keep editing".
- **Opened from a menu or a row.** Control `open` from the menu item's `onSelect` and render the
  `Modal` outside the menu, without `Modal.Trigger`.

## Accessibility

- `Modal.Title` names the dialog; `Modal.Description` is announced with it. Put what is lost
  there, not only in the body.
- Cancel comes before the danger button in the footer. Never make the danger button
  `type="submit"` of an enclosing form, where Enter would trigger it.
- The red button is not the only signal: the title is a question and the button names the verb.
- `persistent` while pending stops Escape from abandoning a running delete; keep Cancel visible
  (disabled) so the state is clear. `Button` has no loading state; change the label and disable.
- A failure in the dialog uses `InlineAlert status="error"` (`role="alert"`, announced).

## Anti-patterns

- "Are you sure?" / OK / Cancel. Title with the object, button with the verb: "Delete project".
- A `primary` button for the destructive action; use `variant="danger"`.
- Closing the dialog before the request finishes, then failing silently.
- Confirming every reversible action; prefer Undo in a `Toast`.
- `Modal.Close asChild` around an async danger button: the dialog closes before the result.
- Two danger buttons, or a danger button plus a primary one, in one footer.
