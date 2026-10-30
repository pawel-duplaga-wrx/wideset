import type { ComponentType } from 'react';

/**
 * The browser side of an example: loads only the one file an Example island shows, so a page
 * does not ship every example of the library. The title, description and code come from the
 * server (src/lib/examples.ts), which also gives the file's key.
 */
const files = import.meta.glob<{ default: ComponentType }>([
  '../../../../packages/design-system/src/components/*/examples/*/*.tsx',
  // The guide pages' own examples (src/lib/guideExamples.ts).
  '../examples/*/*.tsx',
]);

export const loadExample = async (file: string) => {
  const module = await files[file]?.();
  return module?.default ?? null;
};
