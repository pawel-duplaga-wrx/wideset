/**
 * Give the thumbnail the file `name` and it picks the kind from the extension: PDF, spreadsheet,
 * document, video, image; anything it does not know, like `.zip`, shows as a document. To pin it
 * yourself, pass `src` for a real preview (an object URL of the picked image), `type` for a kind,
 * or `icon` for your own glyph. Leave a preview's `alt` empty: the title already names the file
 * for screen readers.
 */
import { RiMusic2Fill } from '@remixicon/react';
import { FileItem } from '@wideset/react';

const files = [
  { name: 'q3-report.pdf', size: '1.2 MB' },
  { name: 'budget-2026.xlsx', size: '640 KB' },
  { name: 'project-brief.docx', size: '88 KB' },
  { name: 'product-demo.mp4', size: '48 MB' },
  { name: 'team-photo.jpg', size: '3.4 MB' },
  { name: 'assets.zip', size: '12 MB' },
];

const PREVIEW =
  'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';

const remove = () => {};

export default function FileItemThumbnails() {
  return (
    <div className="gap-ws-5 flex w-[24rem] max-w-full flex-col">
      {files.map((file) => (
        <FileItem key={file.name} onRemove={remove}>
          <FileItem.Thumbnail name={file.name} />
          <FileItem.Title>{file.name}</FileItem.Title>
          <FileItem.Description>{file.size}</FileItem.Description>
        </FileItem>
      ))}
      <FileItem onRemove={remove}>
        <FileItem.Thumbnail src={PREVIEW} alt="" />
        <FileItem.Title>portrait.jpg</FileItem.Title>
        <FileItem.Description>2.1 MB</FileItem.Description>
      </FileItem>
      <FileItem onRemove={remove}>
        <FileItem.Thumbnail icon={RiMusic2Fill} />
        <FileItem.Title>podcast-episode-12.mp3</FileItem.Title>
        <FileItem.Description>9.8 MB</FileItem.Description>
      </FileItem>
    </div>
  );
}
