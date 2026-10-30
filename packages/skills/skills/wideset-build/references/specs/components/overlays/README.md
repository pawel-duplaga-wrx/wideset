# Overlays

Components that float above the page: dialogs that block it (Modal, StatusModal, Sidepanel) and
anchored surfaces that keep it in view (Popup, DropdownMenu, Tooltip). They are built on Radix
Dialog, Popover, Dropdown Menu and Tooltip, so open state, focus and dismissal follow Radix; this
page says which one to pick and the rules they share.

## Pick the right one

Ask in order; the first yes wins.

1. **Is it only a hint for a control, nothing to click inside?** → [Tooltip](../../../good-practices/tooltip.md)
2. **Is it a list of commands that run when picked?** → [DropdownMenu](../../../good-practices/dropdown-menu.md)
   (choosing a value instead is `Select` / `ComboBox`, not an overlay)
3. **Is the message a status (success, warning, info, error) the user must acknowledge?** →
   [StatusModal](../../../good-practices/status-modal.md)
4. **Must the user finish or dismiss it before doing anything else?**
   - short decision or small form → [Modal](../../../good-practices/modal.md)
   - details, long form or filters next to the content they relate to → [Sidepanel](../../../good-practices/sidepanel.md)
5. **Small content or a quick decision tied to one button, page stays usable?** →
   [Popup](../../../good-practices/popup.md)

| Component    | Blocks the page     | Backdrop | Anchored to trigger | Built-in close (X) | `persistent` |
| ------------ | ------------------- | -------- | ------------------- | ------------------ | ------------ |
| Modal        | yes                 | yes      | no (centred)        | yes                | yes          |
| StatusModal  | yes                 | yes      | no (centred)        | yes                | yes          |
| Sidepanel    | yes                 | yes      | no (screen edge)    | no                 | no           |
| Popup        | no (`modal` opt-in) | no       | yes                 | no                 | yes          |
| DropdownMenu | yes while open      | no       | yes                 | n/a                | n/a          |
| Tooltip      | no                  | no       | yes                 | n/a                | n/a          |

Non-blocking feedback is not an overlay here: `Toast`, `InlineAlert`, `SystemAlert` (`feedback`).

## Shared rules

**Open state.** Every root takes Radix's `open` + `onOpenChange` (controlled) or `defaultOpen`
(uncontrolled); `onOpenChange` fires in both modes. Control it when closing depends on async
work (save, then close) or when something other than the trigger opens the overlay. Otherwise
let the `Trigger` own it.

**Triggers and close controls.** `*.Trigger` and `*.Close` are unstyled Radix parts: use
`asChild` with a `Button` or `IconButton`. Exception: `Modal.Close` used bare renders the styled X.

**Focus.** Modal, StatusModal and Sidepanel trap focus, move it inside on open and return it to
the trigger on close. Popup moves focus in but does not trap it unless `modal` is set on
`Popup`. DropdownMenu manages focus as a menu. Tooltip never takes focus. Turn off the initial
focus move with `autoFocusOnOpen={false}` (Modal, StatusModal) or by preventing
`onOpenAutoFocus`.

**Names.** Every dialog needs its Title part (`Modal.Title`, `StatusModal.Title`,
`Sidepanel.Title`); it is the accessible name. Popup links `Popup.Title` automatically, or takes
`aria-label` on `Popup.Container`. Icon-only close buttons need `aria-label`.

**Portals and stacking.** Every surface portals itself to `document.body`: `Modal.Content`,
`StatusModal.Content`, `Sidepanel.Panel`, `Popup.Container`, `DropdownMenu.Content`,
`Tooltip.Content`. So a menu, select or tooltip inside a Modal or Sidepanel stacks above it
without `z-index` work. Do not add your own Portal or Overlay around them. Popup, DropdownMenu
and Tooltip accept `portalContainer` when content must render elsewhere.

**Dismissal.** Escape and an outside click close every overlay. `persistent` (Modal,
StatusModal, Popup) blocks both; keep a visible Cancel or X when you use it. Passing your own
`onEscapeKeyDown` / `onPointerDownOutside` replaces the built-in `persistent` handling on
StatusModal and Popup.

**Naming traps.** The floating surface is `Modal.Content`, `StatusModal.Content`,
`Sidepanel.Panel`, `Popup.Container`, `DropdownMenu.Content`, `Tooltip.Content`. The scrolling
body is `Modal.Body`, `StatusModal.Body`, `Sidepanel.Content`, `Popup.Content`.

**One at a time.** Do not stack blocking overlays (a Modal over a Sidepanel over a Modal).
Anchored ones (DropdownMenu, Tooltip, Select) inside a dialog are fine.
