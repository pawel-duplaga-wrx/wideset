import React from 'react';
import { Source, useOf } from '@storybook/addon-docs/blocks';

import registry from '../registry.json';

/*
  "Install" block on every component docs page: the CLI command for that component, with
  the copy button of the Source block, so nobody has to guess the registry item name. The item is
  found by the page title: `Components/Icon Button` → `IconButton` → the item titled IconButton
  (`icon-button`); a sub-page such as `Components/Checkbox/CheckboxGroup` falls back to its parent.
  Pages that match no item render nothing.
*/
// TODO(wideset-cli): before publishing the `wideset` package, delete the shadcn lines below and
// uncomment the `npx wideset` ones (here and the Source code further down).
// `@latest`, not the pinned devDependency: CI smokes the pinned version on every change and
// `latest` weekly, so the docs can recommend what consumers would type anyway.
const CLI = 'npx shadcn@latest';
// const CLI = 'npx wideset';
const byTitle = new Map(registry.items.map((item) => [item.title.replace(/\s+/g, ''), item.name]));

export const itemNameForTitle = (title: string): string | undefined => {
  const segments = title.split('/').map((segment) => segment.replace(/\s+/g, ''));
  for (let i = segments.length - 1; i > 0; i--) {
    const name = byTitle.get(segments[i]);
    if (name) return name;
  }
  return undefined;
};

export const InstallCommand = () => {
  const resolved = useOf('meta', ['meta']);
  const name = itemNameForTitle(resolved.preparedMeta.title);
  if (!name) return null;

  return (
    <>
      <h3 id="install">Install</h3>
      <p>
        Copies this component and everything it depends on into your project. One-time setup is on
        the{' '}
        <a
          href="https://wideset-docs.widelab.workers.dev/docs/cli"
          target="_blank"
          rel="noreferrer"
        >
          CLI page
        </a>{' '}
        of the documentation.
      </p>
      <Source language="bash" code={`${CLI} add @wideset/${name}`} />
      {/* TODO(wideset-cli): <Source language="bash" code={`${CLI} add ${name}`} /> */}
    </>
  );
};
