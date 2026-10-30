import { playground } from '../lib/playground-kit';

/** Stage and code come from `examples/icon-button/default.tsx`; this file adds the dark stage. */
export default playground({
  from: 'IconButtonProps',
  stage: (v) => (v.variant === 'inverse' ? 'bg-ws-static-inverse-background' : undefined),
});
