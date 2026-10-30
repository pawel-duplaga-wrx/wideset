import type { ProjectPaths } from '../lib/importSource';
import { PLAYGROUNDS, useValues, withPlayground } from '../lib/playground';
import ComponentCode from './ComponentCode';

/**
 * The playground's current state, written out as the code that produces it, with the import
 * from wherever the reader takes components. It shares the store with the stage and the
 * rail, so turning a knob rewrites this block.
 */
const PlaygroundCode = ({
  component,
  paths,
  className,
}: {
  component: string;
  paths: ProjectPaths;
  className?: string;
}) => {
  const values = useValues(component);
  return (
    <ComponentCode
      code={PLAYGROUNDS[component].code(values)}
      paths={paths}
      snippet
      className={className}
    />
  );
};

export default withPlayground(PlaygroundCode);
