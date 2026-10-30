import type { PropsWithChildren } from 'react';

// px-ws-2 mirrors the 2px inset Figma applies to the Button's label wrapper at
// every size.
const ButtonTruncatedText = ({ children }: PropsWithChildren) => (
  <span data-slot="button-truncated-text" className="px-ws-2 min-w-0 truncate">
    {children}
  </span>
);

ButtonTruncatedText.displayName = 'Button.TruncatedText';

export { ButtonTruncatedText };
