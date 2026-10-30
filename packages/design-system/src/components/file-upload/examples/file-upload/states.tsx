/** `isDragActive` comes from your file library while a file is held over the zone; the label changes to say "Drop files here" and the Browse button steps aside. Disabled takes the zone out of the tab order and makes it ignore the pointer, drops included; the hidden file input is disabled as well. */
import { FileUpload } from '@wideset/react';

const open = () => {};

export default function FileUploadStates() {
  return (
    <div className="gap-x-ws-7 gap-y-ws-9 grid w-[34rem] max-w-full grid-cols-[4rem_minmax(0,1fr)] items-center">
      <span className="typography-caption-md text-ws-static-subtle">Default</span>
      <FileUpload className="min-w-0" browse onBrowse={open} />
      <span className="typography-caption-md text-ws-static-subtle">Drag over</span>
      <FileUpload className="min-w-0" browse isDragActive onBrowse={open} />
      <span className="typography-caption-md text-ws-static-subtle">Disabled</span>
      <FileUpload className="min-w-0" browse disabled onBrowse={open} />
    </div>
  );
}
