/**
 * Contained gives the row a tinted background and padding, so it stands on its own in a form or
 * on a busy surface. Uncontained drops both and lines the file up with the text around it, for
 * lists inside a card or a side panel that already frame it. Keep one variant per list.
 */
import { FileItem } from '@wideset/react';

const remove = () => {};

export default function FileItemVariants() {
  return (
    <div className="gap-ws-9 flex w-[24rem] max-w-full flex-col">
      {(['contained', 'uncontained'] as const).map((variant) => (
        <FileItem key={variant} variant={variant} onRemove={remove}>
          <FileItem.Thumbnail name="q3-report.pdf" />
          <FileItem.Title>q3-report.pdf</FileItem.Title>
          <FileItem.Description>1.2 MB</FileItem.Description>
        </FileItem>
      ))}
    </div>
  );
}
