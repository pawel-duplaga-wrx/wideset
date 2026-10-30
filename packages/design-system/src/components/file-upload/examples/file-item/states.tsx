/**
 * Uploading swaps the remove button for a spinner, and the description's second item (time left)
 * follows a divider. Done shows the remove button, labelled "Remove" plus the file name for
 * screen readers. Failed tints the row and shows a warning icon; `error` is the headline under
 * the row, and any other child lands beneath it, which is where you say how to fix it.
 */
import { FileItem } from '@wideset/react';

const remove = () => {};

export default function FileItemStates() {
  return (
    <div className="gap-ws-5 flex w-[24rem] max-w-full flex-col">
      <FileItem isLoading>
        <FileItem.Thumbnail name="product-demo.mp4" />
        <FileItem.Title>product-demo.mp4</FileItem.Title>
        <FileItem.Description>
          48 MB
          {'4 seconds left'}
        </FileItem.Description>
      </FileItem>
      <FileItem onRemove={remove}>
        <FileItem.Thumbnail name="q3-report.pdf" />
        <FileItem.Title>q3-report.pdf</FileItem.Title>
        <FileItem.Description>1.2 MB</FileItem.Description>
      </FileItem>
      <FileItem error="File exceeds the 25 MB limit" onRemove={remove}>
        <FileItem.Thumbnail name="assets.zip" />
        <FileItem.Title>assets.zip</FileItem.Title>
        <FileItem.Description>48 MB</FileItem.Description>
        <span className="typography-body-md text-ws-static-base">
          Split the archive or upload the files one by one.
        </span>
      </FileItem>
    </div>
  );
}
