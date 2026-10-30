/** Centred text joins two alternatives ("or"). Left-aligned text titles the section that follows, like a quiet heading; right is for a trailing note. Long text is cut with an ellipsis rather than wrapping, so keep it to a word or two. The text sits inside a `role="separator"`, which screen readers may skip, so it cannot be the only heading of a section. */
import { Divider } from '@wideset/react';

export default function DividerTextAlign() {
  return (
    <div className="gap-ws-11 flex w-[20rem] max-w-full flex-col">
      <Divider text="Billing" textAlign="left" />
      <Divider text="or" textAlign="center" />
      <Divider text="Optional" textAlign="right" />
    </div>
  );
}
