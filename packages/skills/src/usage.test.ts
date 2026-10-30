import { describe, expect, it } from 'vitest';

import { toolUsage } from '../evals/grade.mjs';

const tool = (name: string, input: Record<string, unknown>) =>
  JSON.stringify({ type: 'assistant', message: { content: [{ type: 'tool_use', name, input }] } });

describe('toolUsage per skill', () => {
  it('counts Read calls per skill, apart from Skill invocations', () => {
    const stream = [
      tool('Skill', { skill: 'wideset-build' }),
      tool('Read', { file_path: '/app/.claude/skills/wideset-build/SKILL.md' }),
      tool('Read', { file_path: String.raw`C:\app\.claude\skills\wideset-craft\SKILL.md` }),
      tool('Read', { file_path: '/app/.claude/skills/wideset-craft/references/a.md' }),
      tool('Grep', { pattern: 'x', path: '/app/.claude/skills/wideset-review/' }),
      tool('Read', { file_path: '/app/src/App.tsx' }),
    ].join('\n');
    const usage = toolUsage(stream);
    expect(usage.skillsInvoked).toEqual(['wideset-build']);
    expect(usage.skillFilesBySkill).toEqual({ 'wideset-build': 1, 'wideset-craft': 2 });
  });

  it('records the subagent types of Task calls', () => {
    const stream = [
      tool('Task', { subagent_type: 'wideset-ui-reviewer', prompt: 'x' }),
      tool('Task', { subagent_type: 'wideset-theme-reviewer', prompt: 'y' }),
      tool('Task', { prompt: 'no type' }),
    ].join('\n');
    expect(toolUsage(stream).subagents).toEqual(['wideset-ui-reviewer', 'wideset-theme-reviewer']);
  });
});
