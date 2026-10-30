import { expect, test } from 'vitest';

import { cn } from './utils';
const cases: [string, string][] = [
  ['p-ws-4 p-ws-2', 'p-ws-2'],
  ['p-ws-4 p-2', 'p-2'],
  ['gap-ws-control-md gap-ws-2', 'gap-ws-2'],
  ['size-ws-forms-sm size-ws-9', 'size-ws-9'],
  ['rounded-ws-control-md rounded-ws-full', 'rounded-ws-full'],
  ['rounded-ws-control-md rounded-full', 'rounded-full'],
  ['shadow-ws-low shadow-none', 'shadow-none'],
  ['drop-shadow-ws-medium drop-shadow-none', 'drop-shadow-none'],
  ['text-ws-1800 text-ws-250', 'text-ws-250'],
  ['text-ws-1800 text-ws-dynamic-primary-default', 'text-ws-1800 text-ws-dynamic-primary-default'],
  ['text-ws-static-subtle text-ws-dynamic-primary-default', 'text-ws-dynamic-primary-default'],
  ['font-ws-medium font-ws-bold', 'font-ws-bold'],
  ['font-ws-medium font-ws-heading', 'font-ws-medium font-ws-heading'],
  ['font-ws-heading font-ws-body', 'font-ws-body'],
  ['tracking-ws-tight-300 tracking-ws-normal', 'tracking-ws-normal'],
  ['leading-ws-1800 leading-ws-250', 'leading-ws-250'],
  ['z-ws-modal z-ws-popout', 'z-ws-popout'],
  ['z-ws-modal z-10', 'z-10'],
  ['bg-ws-dynamic-primary-default bg-ws-static-background', 'bg-ws-static-background'],
  ['border-ws-dynamic-secondary-default border-2', 'border-ws-dynamic-secondary-default border-2'],
  ['px-ws-5 px-ws-9', 'px-ws-9'],
  ['min-w-0 min-w-ws-11', 'min-w-ws-11'],
  ['max-h-ws-forms-md max-h-none', 'max-h-none'],
];
// Wideset token classes must still resolve conflicts like plain Tailwind classes do.
test.each(cases)('cn(%s)', (input, out) => expect(cn(input)).toBe(out));
