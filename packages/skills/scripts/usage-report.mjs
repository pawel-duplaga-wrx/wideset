/**
 * Markdown tables of skill usage over the stored `general-*` eval results.
 * Usage: node scripts/usage-report.mjs > evals/results/general-usage.md
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '../evals/results');
const files = readdirSync(DIR).filter((f) => /^general-(?!usage).*\.json$/.test(f));
const all = files.flatMap((f) => JSON.parse(readFileSync(join(DIR, f), 'utf8')).results);
const withRuns = all.filter((r) => r.withSkills);
const withoutRuns = all.filter((r) => !r.withSkills);
const cases = [...new Set(all.map((r) => r.case))].sort();

const SKILLS = ['wideset-build', 'wideset-craft', 'wideset-review', 'wideset-setup'];
const count = (runs, f) => runs.filter(f).length;
const sum = (runs, f) => runs.reduce((n, r) => n + f(r), 0);
const row = (cells) => `| ${cells.join(' | ')} |`;
const table = (head, rows) => [row(head), row(head.map(() => '---')), ...rows.map(row)].join('\n');

const invoked = (r, s) => r.usage.skillsInvoked.filter((x) => x === s).length;
const reads = (r, s) => r.usage.skillFilesBySkill?.[s] ?? 0;
const skillTable = (runs) => {
  const names = [
    ...new Set([...SKILLS, ...runs.flatMap((r) => Object.keys(r.usage.skillFilesBySkill ?? {}))]),
  ];
  return table(
    ['skill', 'runs via Skill', 'Skill calls', 'runs with files read', 'file reads'],
    names.map((s) => [
      s,
      count(runs, (r) => invoked(r, s) > 0),
      sum(runs, (r) => invoked(r, s)),
      count(runs, (r) => reads(r, s) > 0),
      sum(runs, (r) => reads(r, s)),
    ]),
  );
};

const out = [];
out.push('# General-request skill usage', '');
out.push(
  `Source: ${files.join(', ')}. ${withRuns.length} with-skills and ${withoutRuns.length} without-skills runs, n=3 per case per arm.`,
  '',
);
out.push('## Skills, all with-skills runs', '', skillTable(withRuns), '');
for (const c of cases) {
  out.push(`## ${c}`, '', skillTable(withRuns.filter((r) => r.case === c)), '');
}
out.push('## Reviewer subagents (with skills)', '');
const subs = {};
for (const r of withRuns) for (const s of r.usage.subagents ?? []) subs[s] = (subs[s] ?? 0) + 1;
out.push(
  Object.keys(subs).length ? table(['subagent', 'calls'], Object.entries(subs)) : 'No Task calls.',
  '',
);
out.push(
  `AGENTS.wideset.md read: with skills ${count(withRuns, (r) => r.usage.agentsFileRead)}/${withRuns.length} runs, without ${count(withoutRuns, (r) => r.usage.agentsFileRead)}/${withoutRuns.length}.`,
  '',
);

const failures = (runs) => {
  const m = {};
  for (const r of runs.filter((x) => !x.pass)) {
    const reasons = [];
    if (!r.agentFinished) reasons.push('agent did not finish');
    if (!r.typecheck) reasons.push('typecheck');
    if (!r.build) reasons.push('build');
    for (const [k, v] of Object.entries(r.checks ?? {})) if (v.length) reasons.push(`${k}`);
    for (const x of reasons.length ? reasons : ['unknown']) m[x] = (m[x] ?? 0) + 1;
  }
  return Object.entries(m)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k} (${v})`)
    .join(', ');
};
out.push(
  '## Pass rate and failure reasons',
  '',
  table(
    ['case', 'with skills', 'without skills'],
    [
      ...cases.map((c) => [
        c,
        `${count(withRuns, (r) => r.case === c && r.pass)}/3`,
        `${count(withoutRuns, (r) => r.case === c && r.pass)}/3`,
      ]),
      [
        'total',
        `${count(withRuns, (r) => r.pass)}/${withRuns.length}`,
        `${count(withoutRuns, (r) => r.pass)}/${withoutRuns.length}`,
      ],
    ],
  ),
  '',
  `Failing runs, with skills, by failed check (a run can fail several): ${failures(withRuns) || 'none'}.`,
  '',
  `Failing runs, without skills: ${failures(withoutRuns) || 'none'}.`,
  '',
);

out.push(
  '## Library source files read',
  '',
  table(
    ['arm', 'runs reading source', 'total reads', 'mean per run'],
    [
      ['with skills', withRuns, 'with'],
      ['without skills', withoutRuns, 'without'],
    ].map(([label, runs]) => [
      label,
      count(runs, (r) => r.usage.librarySourceReads > 0),
      sum(runs, (r) => r.usage.librarySourceReads),
      (sum(runs, (r) => r.usage.librarySourceReads) / (runs.length || 1)).toFixed(1),
    ]),
  ),
  '',
);

const refs = {};
for (const r of withRuns) for (const s of r.usage.specsRead) refs[s] = (refs[s] ?? 0) + 1;
out.push(
  '## Most-read references (top 10, with skills)',
  '',
  table(
    ['reference', 'reads'],
    Object.entries(refs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
  ),
  '',
);
console.log(out.join('\n'));
