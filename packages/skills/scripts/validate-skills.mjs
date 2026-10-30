/*
  Runs the reference validator from the Agent Skills spec on every skill:

    pnpm --filter @wideset/skills validate

  Needs uv (`uvx`). The PyPI package is named skills-ref and its command is `agentskills`.
*/
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

import { listSkills, SKILLS_DIR } from './skill-files.mjs';

const SKILLS_REF = 'skills-ref==0.1.1';

let failed = 0;
for (const { name } of listSkills()) {
  const { status, stdout, stderr, error } = spawnSync(
    'uvx',
    ['--from', SKILLS_REF, 'agentskills', 'validate', join(SKILLS_DIR, name)],
    { encoding: 'utf8', shell: process.platform === 'win32' },
  );
  if (error) throw error;
  if (status !== 0) {
    failed += 1;
    console.error(`${name}\n${stdout}${stderr}`);
  } else {
    console.log(`ok    ${name}`);
  }
}
if (failed) {
  console.error(`${failed} skills do not match the spec`);
  process.exit(1);
}
