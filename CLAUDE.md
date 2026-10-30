@AGENTS.md

## Claude Code notes

- Storybook is registered in `.claude/launch.json`; use the preview tools instead of starting it
  with Bash.
- Project skills are in `.agents/skills/`, reached through the `.claude/skills` symlink. If
  `/wideset-code-review` or `/wideset-component-convention` is not listed, the symlink did not
  check out (Windows): run `git config core.symlinks true && git checkout -- .claude/skills`.
