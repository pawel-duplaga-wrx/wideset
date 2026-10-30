import {
  exampleCode,
  exampleDescription,
} from '../../../../packages/design-system/src/stories/example';

/**
 * Examples on the guide pages (src/content/docs), which are not a component's: files in
 * src/examples/<page>/<name>.tsx with the same shape as a component example (leading JSDoc =
 * description). `guideExample` gives an `<Example>` the props a component page passes it.
 */
const sources = import.meta.glob<string>('../examples/*/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const guideExample = (page: string, name: string) => {
  const file = `../examples/${page}/${name}.tsx`;
  const source = sources[file];
  if (!source) throw new Error(`guideExample: ${file} does not exist`);
  return {
    file,
    title: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
    caption: exampleDescription(source),
    code: exampleCode(source),
    paths: {},
  };
};
