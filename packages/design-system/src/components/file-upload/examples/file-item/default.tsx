/** The playground's stage: one uploaded PDF with a remove button, its props set from the rail. */
import { FileItem, type FileItemProps } from '@wideset/react';

export default function FileItemDefault(props: FileItemProps) {
  return (
    <FileItem className="w-[22rem] max-w-full" onRemove={() => {}} {...props}>
      <FileItem.Thumbnail name="q3-report.pdf" />
      <FileItem.Title>q3-report.pdf</FileItem.Title>
      <FileItem.Description>1.2 MB</FileItem.Description>
    </FileItem>
  );
}
