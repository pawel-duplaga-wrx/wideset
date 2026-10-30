/*
  The small facts about a skill folder that other tools need too (the docs' well-known endpoint,
  the smoke test), without the generator's dependencies.
*/
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const PACKAGE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const SKILLS_DIR = join(PACKAGE, 'skills');

/** The top-level frontmatter fields of a SKILL.md; block scalars come back on one line. */
export function frontmatterOf(text) {
  const match = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fields = {};
  let key = null;
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([a-z-]+):\s*(.*)$/);
    if (field) {
      key = field[1];
      fields[key] = field[2].replace(/^>-?$/, '').replace(/^["']|["']$/g, '');
    } else if (key && /^\s/.test(line)) {
      fields[key] = `${fields[key]} ${line.trim()}`.trim();
    }
  }
  return fields;
}

/** Every file under a directory, posix-relative and sorted, so the output is deterministic. */
export function filesUnder(dir, prefix = '') {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      return entry.isDirectory() ? filesUnder(join(dir, entry.name), path) : [path];
    })
    .sort();
}

/** @returns {{ name: string, description: string, files: string[] }[]} */
export function listSkills(skillsDir = SKILLS_DIR) {
  return readdirSync(skillsDir)
    .filter((name) => existsSync(join(skillsDir, name, 'SKILL.md')))
    .sort()
    .map((name) => ({
      name,
      description: frontmatterOf(readFileSync(join(skillsDir, name, 'SKILL.md'), 'utf8'))
        .description,
      files: filesUnder(join(skillsDir, name)),
    }));
}
