import type { ThumbnailFileType } from './Thumbnail.types';

const EXTENSIONS: Record<ThumbnailFileType, readonly string[]> = {
  pdf: ['pdf'],
  spreadsheet: ['xls', 'xlsx', 'xlsm', 'csv', 'tsv', 'ods', 'numbers'],
  document: ['doc', 'docx', 'odt', 'rtf', 'txt', 'md', 'pages'],
  video: ['mp4', 'm4v', 'mov', 'webm', 'avi', 'mkv', 'wmv', 'mpg', 'mpeg'],
  picture: [
    'png',
    'jpg',
    'jpeg',
    'gif',
    'webp',
    'svg',
    'bmp',
    'heic',
    'heif',
    'avif',
    'tif',
    'tiff',
  ],
};

const MIME_TYPES: ReadonlyArray<[test: (mime: string) => boolean, type: ThumbnailFileType]> = [
  [(m) => m === 'application/pdf', 'pdf'],
  [(m) => m.startsWith('image/'), 'picture'],
  [(m) => m.startsWith('video/'), 'video'],
  [(m) => m.includes('spreadsheet') || m.includes('excel') || m === 'text/csv', 'spreadsheet'],
  [
    (m) =>
      m.startsWith('text/') || m.includes('word') || m.includes('document') || m.includes('rtf'),
    'document',
  ],
];

/**
 * Picks the Thumbnail `type` for a file from its MIME type, then its
 * extension. Anything unrecognised — archives, audio, code — falls back to
 * `document`, the most generic of Figma's file kinds.
 */
export const getThumbnailType = (name?: string, mimeType?: string): ThumbnailFileType => {
  if (mimeType) {
    const mime = mimeType.toLowerCase();
    const match = MIME_TYPES.find(([test]) => test(mime));
    if (match) return match[1];
  }

  const extension = name?.split('.').pop()?.toLowerCase();
  if (extension && extension !== name?.toLowerCase()) {
    const match = (Object.keys(EXTENSIONS) as ThumbnailFileType[]).find((type) =>
      EXTENSIONS[type].includes(extension),
    );
    if (match) return match;
  }

  return 'document';
};
