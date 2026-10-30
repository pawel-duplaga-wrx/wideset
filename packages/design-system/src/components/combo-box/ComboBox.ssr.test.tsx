import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ComboBox } from './ComboBox';

const options = [
  { label: 'Poland', value: 'poland' },
  { label: 'Germany', value: 'germany' },
];

/*
  On the server there is no `document` and no `window` at all: reading either as a bare identifier
  throws a ReferenceError, and `document?.body` does not help because optional chaining guards a
  null value, not an undeclared name. Removing the globals reproduces that inside jsdom.
*/
const withoutDom = <T,>(run: () => T): T => {
  const saved = { document: globalThis.document, window: globalThis.window };
  Reflect.deleteProperty(globalThis, 'document');
  Reflect.deleteProperty(globalThis, 'window');
  try {
    return run();
  } finally {
    Object.assign(globalThis, saved);
  }
};

describe('ComboBox server rendering', () => {
  it('should render on the server when it has options', () => {
    const html = withoutDom(() =>
      renderToString(<ComboBox options={options} placeholder="Select country" />),
    );

    expect(html).toContain('Select country');
  });
});
