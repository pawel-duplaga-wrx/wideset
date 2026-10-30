/** The playground's stage: the dropzone, its props set from the rail. `onBrowse` is a file library's `open()`. */
import { FileUpload, type FileUploadProps } from '@wideset/react';

export default function FileUploadDefault(props: Partial<FileUploadProps>) {
  return <FileUpload className="w-[26rem] max-w-full" {...props} onBrowse={() => {}} />;
}
