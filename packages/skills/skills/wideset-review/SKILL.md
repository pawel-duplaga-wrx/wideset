---
name: wideset-review
description: Review UI built with Wideset before calling it done. Use when finishing a screen, when asked to review or audit a Wideset page or component usage, or on any change to theming. Gives a verdict with concrete fixes, using reviewer agents when available.
license: Apache-2.0
---

# Wideset review

Review what was built against what was asked. Do not edit during review; report first.

## Run it

1. Gather the changed files, and screenshots in light and dark if you can produce them. Note the original request.
2. Run the mechanical checks below, and any type-check, lint or build the project has. Fix those failures first, since a review of code that does not compile is wasted.
3. Run the reviewers on the files or screenshots:
   - If your tool has subagents and `wideset-ui-reviewer` and `wideset-theme-reviewer` are installed, delegate to them.
   - Otherwise apply [references/ui-review.md](references/ui-review.md) and [references/theme-review.md](references/theme-review.md) yourself, one at a time, each as a fresh pass.

   Use the theme review when colours or surfaces changed, or when the screen ships in dark mode.

4. Merge the results into the report below. Fix what is blocking, then run the failed checks again.

## Mechanical checks

Run these from the project root, adjusted to the source directory. Each should return nothing:

```bash
# Palette and raw colours
grep -rnE "(bg|text|border|ring|fill)-(gray|slate|zinc|neutral|red|green|blue|amber|yellow|emerald|indigo|violet)-[0-9]+|#[0-9a-fA-F]{6}\b" src --include=*.tsx

# Tailwind scale classes where a ws token belongs
grep -rnE "(className|cn\().*[\" ](p|px|py|m|mx|my|gap|text|rounded|shadow)-(xs|sm|md|lg|xl|[0-9]+)[\" ]" src --include=*.tsx

# dark: variants; tokens flip on their own
grep -rn "dark:" src --include=*.tsx

# Inline SVG, where a Remix icon should be used
grep -rn "<svg" src --include=*.tsx
```

A hit needs a reason, not automatically a change: an arbitrary value or a chart's own colours can be legitimate.

## Report

```
Verdict: ready | fix first | rethink

Blocking
- file:line: what is wrong, why it matters, the fix

Should fix
- file:line: …

Worth considering
- …
```

- **Blocking** means something is broken, inaccessible, untrue to the request, or outside the design system.
- **Rethink** means the screen answers the wrong question or has no clear job; list the reason and stop there.
- Every finding names a place and a fix. "Improve the hierarchy" is not a finding; "Three filled buttons in the footer; keep Save filled, make Export secondary" is.
- Say what is good only when it is useful for the next screen.
