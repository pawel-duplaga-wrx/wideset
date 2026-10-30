/**
 * The plain dropzone is itself the control: it takes focus and opens the picker on click, Enter
 * or Space. With `browse`, the Browse button takes that job and the zone only receives drops;
 * pick it when the zone sits among other controls and a click on the empty area should do
 * nothing. The button trigger has no drop area, for tight spaces like a toolbar or a table row.
 * `onBrowse` is your file library's `open()`.
 */
import { FileUpload } from '@wideset/react';

const open = () => {};

export default function FileUploadTypes() {
  return (
    <div className="gap-ws-12 flex w-[26rem] max-w-full flex-col">
      <FileUpload onBrowse={open} />
      <FileUpload browse onBrowse={open} />
      <FileUpload type="button" onBrowse={open} />
    </div>
  );
}
