import { type ComponentType, createElement } from 'react';

/**
 * A story that shows one example file (`src/components/<folder>/examples/<page>/<name>.tsx`).
 * The same file is a section of the component's docs page, so the story and the page cannot
 * drift: Storybook renders it, "Show code" prints the file as written, and the description is
 * the file's leading JSDoc.
 *
 * ```tsx
 * import SizesExample from './examples/tabs/sizes';
 * import sizesSource from './examples/tabs/sizes?raw';
 *
 * export const Sizes: Story = exampleStory(SizesExample, sizesSource);
 * ```
 */
export const exampleStory = (Component: ComponentType, source: string) => ({
  render: () => createElement(Component),
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: exampleDescription(source) },
      source: { code: exampleCode(source), language: 'tsx' },
    },
  },
});

const LEADING_JSDOC = /^\s*\/\*\*([\s\S]*?)\*\/\s*/;

/** The example's leading JSDoc, as plain text. */
export const exampleDescription = (source: string) =>
  source
    .match(LEADING_JSDOC)?.[1]
    ?.replace(/^\s*\* ?/gm, '')
    .trim();

/** The example's code: everything after its leading JSDoc. */
export const exampleCode = (source: string) => source.replace(LEADING_JSDOC, '').trimEnd();
