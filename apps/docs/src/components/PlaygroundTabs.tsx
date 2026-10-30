import { Tabs } from '@wideset/react';

import type { ProjectPaths } from '../lib/importSource';
import { useKeepHeight } from '../lib/useKeepHeight';
import CodePanel from './CodePanel';
import Playground from './Playground';
import PlaygroundCode from './PlaygroundCode';
import TabRow from './TabRow';

/**
 * The top of a component page: the live stage under Preview and the code for exactly what
 * is on it under Code. Both read the same store as the Properties panel in the rail; the
 * Code panel is exactly as tall as the stage, so switching tabs does not move the page.
 */
const PlaygroundTabs = ({ component, paths }: { component: string; paths: ProjectPaths }) => {
  const preview = useKeepHeight<HTMLDivElement>();
  return (
    <Tabs defaultValue="preview" divider={false}>
      <TabRow>
        <Tabs.List>
          <Tabs.Item value="preview">
            <Tabs.Label>Preview</Tabs.Label>
          </Tabs.Item>
          <Tabs.Item value="code">
            <Tabs.Label>Code</Tabs.Label>
          </Tabs.Item>
        </Tabs.List>
      </TabRow>
      <Tabs.Content value="preview" className="pt-ws-8">
        <div ref={preview.ref}>
          <Playground component={component} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="code" className="pt-ws-8">
        <CodePanel height={preview.minHeight}>
          <PlaygroundCode component={component} paths={paths} className="flex-1" />
        </CodePanel>
      </Tabs.Content>
    </Tabs>
  );
};

export default PlaygroundTabs;
