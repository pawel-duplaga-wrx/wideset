/**
 * The preset sets the emphasis. Filled is the one action the view is for, so use it once per
 * view. Border is a real alternative the user may take instead. Ghost is the way out (cancel,
 * back, dismiss) and the quiet action in dense layouts.
 */
import { Button } from '@wideset/react';

export default function ButtonPresets() {
  return (
    <div className="gap-ws-12 flex flex-wrap items-center">
      <Button preset="filled">Publish</Button>
      <Button preset="border">Save draft</Button>
      <Button preset="ghost">Cancel</Button>
    </div>
  );
}
