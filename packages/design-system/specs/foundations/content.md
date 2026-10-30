# Content

Interface text helps someone finish a task. Be specific, be brief, sound like a person. This file
holds the copy rules shared by every component; a component spec's Content section adds its own
(length, counts).

## Rules

- Say what happens or what to do. Skip greetings, praise and explanations of the obvious.
- Use the product's and its users' words, one word per concept: not "remove" here and "delete"
  there.
- Sentence case everywhere: "Create project", not "Create Project".
- No full stop on labels, buttons or titles. Full sentences keep theirs.
- Numbers as digits ("3 invoices"), with the right singular and plural.
- No "please", "oops", "simply" or exclamation marks in errors.

## Buttons and links

A verb and its object. The label says what happens, not what the button is.

| Instead of              | Write                         |
| ----------------------- | ----------------------------- |
| Submit                  | Create project                |
| OK                      | Delete invoice                |
| Yes / No                | Delete invoice / Keep invoice |
| Click here              | View invoice                  |
| Save and continue later | Save draft                    |

## Headings

Name the thing or say what is happening: "Invoices", not "Manage your invoices". A section whose
content makes it obvious needs no heading.

## Errors

Say what went wrong and how to fix it, without blame. Show a code only when the user can use it.
Keep everything the user typed.

| Instead of                     | Write                                         |
| ------------------------------ | --------------------------------------------- |
| Invalid input                  | Enter an email address, like name@company.com |
| Error 500                      | We couldn't save your changes. Try again.     |
| Password too weak              | Use at least 12 characters                    |
| You failed to fill in the name | Enter a project name                          |

Where an error goes (field, form, page) is in [page-feedback](../patterns/page-feedback.md) and
[form-page](../patterns/form-page.md).

## Empty states

Say what will appear here and how to start: one sentence, one action.

> **No invoices yet.** Invoices you create or import appear here. [Create invoice]

"Filtered to nothing" is a different state: "No invoices match these filters." with a
"Clear filters" action. Never use one message for both (see
[list-and-filters](../patterns/list-and-filters.md)).

## Confirmations

Name what is affected and what cannot be undone, and repeat the action on the button.

> **Delete "Website redesign"?** This also deletes its 12 tasks. This cannot be undone.
> [Delete project] [Keep project]

Structure and dialog choice: [confirm-destructive](../patterns/confirm-destructive.md).

## Toasts

The result in a few words, past tense: "Invoice sent". Add the action if there is one: "Invoice
deleted" with an Undo. Do not narrate progress that something else already shows. Component
rules: [Toast](../components/feedback/toast.md).

## Helper text and placeholders

- Helper text says what the field needs or how the value is used: "Shown on invoices."
- A placeholder is an example, never the label or an instruction: it disappears on typing.
- Do not repeat the label ("Name: enter your name").

## Sample data

Sample content looks like the product: plausible names, real-looking amounts and dates, varied
lengths so the layout is tested. No lorem ipsum, "Test 1" or "John Doe".
