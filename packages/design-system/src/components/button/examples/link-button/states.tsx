/**
 * Hover, press and keyboard focus are live. A link has no native disabled state, so `disabled`
 * sets `aria-disabled`, removes it from the tab order and cancels the click. Use it only while the
 * destination is temporarily unavailable; otherwise hide the link.
 */
import { LinkButton } from '@wideset/react';

export default function LinkButtonStates() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <LinkButton href="#report">Download report</LinkButton>
      <LinkButton href="#report" disabled>
        Download report
      </LinkButton>
    </div>
  );
}
