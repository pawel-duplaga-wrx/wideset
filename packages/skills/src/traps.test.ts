import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

// @ts-expect-error -- plain ESM module without declarations
import { checkTraps, grade, parseCase, TRAPS } from '../evals/grade.mjs';

const CASES = resolve(dirname(fileURLToPath(import.meta.url)), '../evals/cases');

/** For every trap: a snippet the natural implementation produces, and one that follows the spec. */
const SNIPPETS: Record<string, { wrong: string; right: string }> = {
  'choice-plan-radio': {
    wrong: `<Select options={plans} value={plan} onValueChange={setPlan} aria-label="Plan" />`,
    right: `<RadioButton.Group value={plan} onValueChange={setPlan} aria-label="Plan">
      <RadioButton value="starter" label="Starter" />
    </RadioButton.Group>`,
  },
  'choice-status-badge': {
    wrong: `<Table.Cell><Tag>Overdue</Tag></Table.Cell>`,
    right: `<Table.Cell><StatusBadge color="negative">Overdue</StatusBadge></Table.Cell>`,
  },
  'choice-save-checkbox': {
    wrong: `<form><Switch label="I accept the terms" /><Button>Create account</Button></form>`,
    right: `<form><Checkbox label="I accept the terms" /><Button>Create account</Button></form>`,
  },
  'choice-sidepanel-long-form': {
    wrong: `<Modal><Modal.Content><Modal.Title>Edit customer</Modal.Title></Modal.Content></Modal>`,
    right: `<Sidepanel><Sidepanel.Panel><Sidepanel.Title>Edit customer</Sidepanel.Title></Sidepanel.Panel></Sidepanel>`,
  },
  'choice-row-menu': {
    wrong: `<Select options={actions} onValueChange={run} aria-label="Actions" />`,
    right: `<DropdownMenu><DropdownMenu.Content><DropdownMenu.Item onSelect={rename}>Rename</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu>`,
  },
  'menu-modal-trigger': {
    wrong: `<DropdownMenu><DropdownMenu.Content>
      <DropdownMenu.Item><Modal.Trigger asChild><Button>Delete</Button></Modal.Trigger></DropdownMenu.Item>
    </DropdownMenu.Content></DropdownMenu>`,
    right: `<><DropdownMenu><DropdownMenu.Content>
      <DropdownMenu.Item onSelect={() => setOpen(true)}>Delete</DropdownMenu.Item>
    </DropdownMenu.Content></DropdownMenu>
    <Modal open={open} onOpenChange={setOpen}><Modal.Content /></Modal></>`,
  },
  'modal-close-async': {
    wrong: `<Modal.Footer><Modal.Close asChild><Button onClick={save}>Save</Button></Modal.Close></Modal.Footer>`,
    right: `<Modal.Footer>
      <Modal.Close asChild><Button variant="secondary" preset="border">Cancel</Button></Modal.Close>
      <Button onClick={save}>Save</Button>
    </Modal.Footer>`,
  },
  'toast-provider': {
    wrong: `<Toast status="success"><Toast.Message>Saved</Toast.Message></Toast>`,
    right: `<ToastProvider><App /></ToastProvider>; const { showToast } = useToast(); showToast({ content: 'Saved' });`,
  },
  'optional-select-empty': {
    wrong: `<Select options={[{ value: '', label: 'No manager' }, { value: 'ada', label: 'Ada' }]} />`,
    right: `<Select clearable placeholder="No manager" options={[{ value: 'ada', label: 'Ada' }]} />`,
  },
  'checkbox-group-field': {
    wrong: `<FormField label="Notify me by"><Checkbox label="Email" /><Checkbox label="SMS" /></FormField>`,
    right: `<FormField label="Notify me by" id="notify"><CheckboxGroup aria-labelledby="notify"><Checkbox label="Email" /></CheckboxGroup></FormField>`,
  },
  'composed-select-field': {
    wrong: `<FormField label="Country" htmlFor="country" helperText="Where we ship">
      <Select id="country"><Select.Trigger><Select.Value /></Select.Trigger><Select.Content /></Select>
    </FormField>`,
    right: `<FormField label="Country" htmlFor="country" helperText="Where we ship" helperTextId="country-help">
      <Select><Select.Trigger id="country" aria-describedby="country-help"><Select.Value /></Select.Trigger><Select.Content /></Select>
    </FormField>`,
  },
  'tile-selectable': {
    wrong: `<Tile.Checkbox title="Slack"><Switch /></Tile.Checkbox>`,
    right: `<Tile.Checkbox title="Slack"><Tile.Indicator /></Tile.Checkbox>`,
  },
  'search-deprecated': {
    wrong: `<Search value={query} onChange={onChange} />`,
    right: `<TextInput value={query}><TextInput.Input type="search" aria-label="Search" /></TextInput>`,
  },
};

describe('traps', () => {
  it('has snippets for every trap', () => {
    expect(Object.keys(SNIPPETS).sort()).toEqual(Object.keys(TRAPS).sort());
  });

  for (const [id, { wrong, right }] of Object.entries(SNIPPETS)) {
    describe(id, () => {
      it('fires on the natural, wrong implementation', () => {
        const problems: string[] = checkTraps(wrong, [id]);
        expect(problems.length).toBeGreaterThan(0);
        expect(problems.every((problem) => problem.startsWith(`${id}: `))).toBe(true);
      });

      it('stays quiet on the one the spec describes', () => {
        expect(checkTraps(right, [id])).toEqual([]);
      });

      it('fires only when a case arms it', () => {
        const other = Object.keys(TRAPS).find((key) => key !== id)!;
        expect(
          checkTraps(wrong, [other]).filter((problem: string) => problem.startsWith(`${id}:`)),
        ).toEqual([]);
      });
    });
  }

  it('catches the empty option value written as a JSX attribute', () => {
    expect(
      checkTraps('<Select.Option value="">None</Select.Option>', ['optional-select-empty']),
    ).toHaveLength(1);
  });

  it('reads a Toast set up across files', () => {
    expect(
      checkTraps(['useToast();', '<ToastProvider><App /></ToastProvider>'], ['toast-provider']),
    ).toEqual([]);
    expect(checkTraps(['useToast();', '<App />'], ['toast-provider'])).toHaveLength(1);
  });

  it('rejects an unknown trap', () => {
    expect(() => checkTraps('<div />', ['nope'])).toThrow(/unknown/);
  });
});

describe('trap cases', () => {
  const cases = readdirSync(CASES)
    .filter((file) => file.startsWith('trap-'))
    .map((file) => parseCase(readFileSync(join(CASES, file), 'utf8')));

  it('are twelve, each arming known traps', () => {
    expect(cases).toHaveLength(12);
    for (const testCase of cases) {
      expect(testCase.traps.length, testCase.name).toBeGreaterThan(0);
      for (const id of testCase.traps) expect(TRAPS[id], `${testCase.name}: ${id}`).toBeDefined();
    }
  });

  it('cover every trap', () => {
    expect(new Set(cases.flatMap((testCase) => testCase.traps))).toEqual(
      new Set(Object.keys(TRAPS)),
    );
  });

  it('never name a component in the prompt', () => {
    for (const testCase of cases)
      expect(testCase.prompt, testCase.name).not.toMatch(
        /\b(Select|Modal|Switch|Checkbox|Tile|Toast|Sidepanel|Tag|Chip|StatusBadge|Search)\b/,
      );
  });

  it('resolve their traps from the case name', () => {
    expect(checkTraps(SNIPPETS['choice-plan-radio'].wrong, 'trap-plan-picker')).toHaveLength(1);
    expect(checkTraps(SNIPPETS['choice-plan-radio'].right, 'trap-plan-picker')).toEqual([]);
  });
});

describe('grade with traps', () => {
  const clean = `import { Button } from '@wideset/react';\nexport const A = () => <Button>Go</Button>;`;

  it('does not report traps for a case that arms none', () => {
    expect(grade([clean], ['Button']).traps).toBeUndefined();
  });

  it('reports a fired trap apart from the other checks and fails the run', () => {
    const source = `import { Select, Button } from '@wideset/react';\nexport const A = () => <Select options={[]} aria-label="Plan" />;`;
    const result = grade([source], ['Select'], ['choice-plan-radio']);
    expect(result.pass).toBe(false);
    expect(result.checks.craft).toEqual([]);
    expect(result.traps.armed).toEqual(['choice-plan-radio']);
    expect(result.traps.fired).toHaveLength(1);
  });

  it('passes a run whose armed traps stay quiet', () => {
    expect(grade([clean], ['Button'], ['choice-plan-radio'])).toMatchObject({
      pass: true,
      traps: { fired: [] },
    });
  });
});
