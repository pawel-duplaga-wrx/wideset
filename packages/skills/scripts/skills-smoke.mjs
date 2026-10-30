/*
  End-to-end test of the install channels the registry and CLI smokes do not cover, the way a
  consumer meets them. Each runs in a fresh Vite project and a fresh Next.js project. These channels
  only copy files, so the starters are not installed or built; registry-smoke and cli-smoke build.

    pnpm test:skills                      # from the repository root; every channel
    node scripts/skills-smoke.mjs --only well-known      # one of: npm, repo, well-known, plugin
    node scripts/skills-smoke.mjs --keep  # leave the work directory behind

  npm         the tarball `npm pack` produces, installed, then `skills experimental_sync`
  repo        `skills add <this repository>`: lists consumer skills only, then installs them
  well-known  `skills add http://127.0.0.1:<port>`: the docs' /.well-known/agent-skills. Serves the
              built site (apps/docs/dist) when there is one, else writes the endpoint itself
  plugin      `claude plugin validate` and Codex's marketplace, each skipped when not installed

  The skills CLI is pinned below. `npx skills add widelab-co/wideset/packages/skills` and the GitHub marketplace read the
  repository on GitHub, so they are not covered here; the local path exercises the same discovery.
*/
import { spawn, spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, resolve, sep } from 'node:path';

import { listSkills, PACKAGE } from './skill-files.mjs';

const SKILLS_CLI = 'skills@1.7.4';
// The same starters as cli-smoke.mjs.
const CREATE_VITE = '9.2.1';
const CREATE_NEXT_APP = '16.4.3';
const REPO = resolve(PACKAGE, '../..');
const EXPECTED = listSkills().map((skill) => skill.name);
const DOCS_ROOT = join(REPO, 'apps/docs/dist');

const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : undefined;
const log = (message) => console.log(`[skills-smoke] ${message}`);

// 0xC0000409: on Windows, Node sometimes aborts while exiting after the skills CLI has finished its
// work. Each channel checks the files on disk afterwards, so that is what decides.
const WINDOWS_EXIT_ABORT = 3221226505;

const run = (cmd, cmdArgs, cwd, env = {}) =>
  new Promise((done, reject) => {
    const child = spawn(cmd, cmdArgs, {
      cwd,
      env: { ...process.env, CI: 'true', npm_config_yes: 'true', FORCE_COLOR: '0', ...env },
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: process.platform === 'win32',
    });
    let out = '';
    child.stdout.on('data', (chunk) => (out += chunk));
    child.stderr.on('data', (chunk) => (out += chunk));
    child.on('error', reject);
    child.on('close', (status) => {
      // eslint-disable-next-line no-control-regex
      const text = out.replace(/\x1b\[[0-9;?]*[A-Za-z]/g, '');
      if (status === 0 || (status === WINDOWS_EXIT_ABORT && process.platform === 'win32'))
        done(text);
      else
        reject(new Error(`${cmd} ${cmdArgs.join(' ')} failed (${status})\n${text.slice(-3000)}`));
    });
  });

const skills = (cmdArgs, cwd) => run('npx', ['--yes', SKILLS_CLI, ...cmdArgs], cwd);

/** One pristine starter per framework; each channel copies them. */
async function createStarters(work) {
  const starters = join(work, 'starters');
  mkdirSync(starters, { recursive: true });
  await run(
    'npm',
    ['create', `vite@${CREATE_VITE}`, 'vite', '--', '--template', 'react-ts', '--no-interactive'],
    starters,
  );
  await run(
    'npx',
    [
      '--yes',
      `create-next-app@${CREATE_NEXT_APP}`,
      'next',
      '--yes',
      '--use-npm',
      '--disable-git',
      '--skip-install',
    ],
    starters,
  );
  return { vite: join(starters, 'vite'), next: join(starters, 'next') };
}

function freshProject(work, name, starter) {
  const app = join(work, name);
  cpSync(starter, app, { recursive: true });
  return app;
}

// `-a claude-code --copy` writes to .claude/skills; sync keeps its shared copy in .agents/skills.
function assertInstalled(app) {
  const root = existsSync(join(app, '.claude/skills', 'wideset-setup'))
    ? '.claude/skills'
    : '.agents/skills';
  const missing = EXPECTED.filter((name) => !existsSync(join(app, root, name, 'SKILL.md')));
  if (missing.length) throw new Error(`not in ${root}: ${missing.join(', ')}`);
  const reference = join(app, root, 'wideset-build/references/specs/patterns/form-page.md');
  if (!existsSync(reference)) throw new Error(`${root}: the specs did not install`);
  const practices = join(app, root, 'wideset-build/references/good-practices/button.md');
  if (!existsSync(practices)) throw new Error(`${root}: the good practices did not install`);
}

function assertListed(output) {
  // A listed skill is a row holding only its name; the rest of the output quotes paths and prose.
  const listed = [...output.matchAll(/^[^\w\n]*(wideset-[a-z0-9-]+)\s*$/gm)].map((row) => row[1]);
  const missing = EXPECTED.filter((name) => !listed.includes(name));
  if (missing.length) throw new Error(`not listed: ${missing.join(', ')}\n${output}`);
  const extra = [...new Set(listed)].filter((name) => !EXPECTED.includes(name));
  if (extra.length) throw new Error(`contributor skills leaked: ${extra.join(', ')}`);
}

// The skills CLI asks for the index at the host root, so this serves a site from `/`.
async function serveSite(root) {
  const types = { '.json': 'application/json', '.md': 'text/markdown' };
  const server = createServer((req, res) => {
    const file = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(root + sep) || !existsSync(file) || !extname(file)) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  await new Promise((done) => server.listen(0, '127.0.0.1', done));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

async function wellKnownRoot(work) {
  if (existsSync(join(DOCS_ROOT, '.well-known/agent-skills/index.json'))) {
    log(`serving the built site ${DOCS_ROOT}`);
    return DOCS_ROOT;
  }
  log('no built site (apps/docs/dist): writing the endpoint directly');
  const root = join(work, 'site');
  const { writeAgentSkills } = await import('../../../apps/docs/scripts/gen-agent-skills.mjs');
  writeAgentSkills(join(root, '.well-known/agent-skills'));
  return root;
}

const available = (cmd) =>
  spawnSync(cmd, ['--version'], { shell: process.platform === 'win32' }).status === 0;

const CHANNELS = {
  async npm(work, starter, framework) {
    mkdirSync(join(work, 'pack'), { recursive: true });
    const packed = await run('npm', ['pack', '--pack-destination', join(work, 'pack')], PACKAGE);
    // The output also carries npm's notices, in no fixed order.
    const name = packed
      .split('\n')
      .map((line) => line.trim())
      .findLast((line) => /^[\w@.-]+\.tgz$/.test(line));
    if (!name) throw new Error(`npm pack named no tarball:\n${packed}`);
    const tarball = join(work, 'pack', name);
    const app = freshProject(work, `npm-${framework}`, starter);
    await run('npm', ['install', '-D', '--no-audit', '--no-fund', tarball], app);
    const shipped = join(app, 'node_modules/@wideset/skills');
    for (const file of ['AGENTS.wideset.md', 'LICENSE', 'NOTICE', 'cursor/wideset.mdc']) {
      if (!existsSync(join(shipped, file))) throw new Error(`the tarball has no ${file}`);
    }
    if (existsSync(join(shipped, 'scripts'))) throw new Error('the tarball ships scripts/');
    await skills(['experimental_sync', '-y', '--copy', '-a', 'claude-code'], app);
    assertInstalled(app);
  },

  async repo(work, starter, framework) {
    const app = freshProject(work, `repo-${framework}`, starter);
    assertListed(await skills(['add', REPO, '--list'], app));
    await skills(['add', REPO, '--skill', '*', '-a', 'claude-code', '-y', '--copy'], app);
    assertInstalled(app);
  },

  async 'well-known'(work, starter, framework) {
    const site = await serveSite(await wellKnownRoot(work));
    try {
      const app = freshProject(work, `well-known-${framework}`, starter);
      assertListed(await skills(['add', site.url, '--list'], app));
      await skills(['add', site.url, '--skill', '*', '-a', 'claude-code', '-y', '--copy'], app);
      assertInstalled(app);
    } finally {
      site.close();
    }
  },
};

async function plugin(work) {
  if (available('claude')) await run('claude', ['plugin', 'validate', REPO], REPO);
  else log('claude is not installed: skipping plugin validate');
  if (available('codex')) {
    const env = { CODEX_HOME: join(work, 'codex-home') };
    mkdirSync(env.CODEX_HOME);
    await run('codex', ['plugin', 'marketplace', 'add', REPO], REPO, env);
    const listed = await run('codex', ['plugin', 'list'], REPO, env);
    if (!listed.includes('wideset@wideset')) throw new Error(`codex lists:\n${listed}`);
    await run('codex', ['plugin', 'add', 'wideset@wideset'], REPO, env);
  } else {
    log('codex is not installed: skipping its marketplace');
  }
}

async function main() {
  if (only && only !== 'plugin' && !CHANNELS[only]) {
    throw new Error(
      `--only expects one of ${Object.keys(CHANNELS).join(', ')}, plugin; got "${only}"`,
    );
  }
  const work = mkdtempSync(join(tmpdir(), 'wideset-skills-smoke-'));
  log(`work dir ${work}`);
  const failures = [];
  const attempt = async (label, step) => {
    const started = Date.now();
    try {
      await step();
      log(`ok    ${label} (${((Date.now() - started) / 1000).toFixed(0)}s)`);
    } catch (err) {
      failures.push(label);
      log(`FAIL  ${label}\n${err.message}`);
    }
  };
  try {
    if (only !== 'plugin') {
      log(`starters: create-vite@${CREATE_VITE}, create-next-app@${CREATE_NEXT_APP}`);
      const starters = await createStarters(work);
      for (const name of only ? [only] : Object.keys(CHANNELS))
        for (const [framework, starter] of Object.entries(starters))
          await attempt(`${name} in ${framework}`, () => CHANNELS[name](work, starter, framework));
    }
    if (!only || only === 'plugin') await attempt('plugin', () => plugin(work));
  } finally {
    if (!args.includes('--keep')) rmSync(work, { recursive: true, force: true });
  }
  if (failures.length) {
    log(`${failures.length} failed: ${failures.join(', ')}`);
    process.exit(1);
  }
  log('all channels passed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
