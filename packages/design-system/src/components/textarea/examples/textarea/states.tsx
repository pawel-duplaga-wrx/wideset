/**
 * A disabled textarea cannot be focused and is skipped by the keyboard, so keep it only when the
 * user can tell why. Text longer than `rows` scrolls inside the field, and the user can drag the
 * corner to make it taller (`resize="vertical"` is the default).
 */
import { Textarea } from '@wideset/react';

export default function TextareaStates() {
  return (
    <div className="gap-ws-12 flex w-[24rem] max-w-full flex-col">
      <Textarea rows={2} placeholder="Add a comment" aria-label="Comment" />
      <Textarea rows={2} disabled placeholder="Add a comment" aria-label="Comment" />
      <Textarea
        rows={3}
        aria-label="Release notes"
        defaultValue={
          'Invoices can now be exported as PDF.\nThe client list loads twice as fast.\nFixed: due dates showed in the wrong time zone.\nFixed: the search ignored archived projects.'
        }
      />
    </div>
  );
}
