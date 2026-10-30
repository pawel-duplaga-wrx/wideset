import * as ModalPrimitive from '@radix-ui/react-dialog';
import { cn } from 'src/lib/utils';

import { useStatusModal } from './StatusModal.context';
import type { StatusModalTitleProps } from './StatusModal.types';
import { statusModalCloseGutter } from './StatusModal.variants';
import { StatusModalIcon } from './StatusModalIcon';

const StatusModalTitle = ({ status, orientation, className, ...props }: StatusModalTitleProps) => {
  const {
    status: contextStatus,
    orientation: contextOrientation,
    showCloseButton,
  } = useStatusModal();
  const resolvedStatus = status ?? contextStatus;
  const resolvedOrientation = orientation ?? contextOrientation;
  // Without a status badge there is no header row above the text, so in the
  // horizontal layout the close button shares the title's line (Figma:
  // Type=Neutral, Orientation=Horizontal -> Content is a ROW).
  const sharesRowWithClose =
    resolvedOrientation === 'horizontal' && resolvedStatus === 'neutral' && showCloseButton;

  return (
    <div
      className={cn(
        'gap-ws-7 flex flex-col',
        resolvedOrientation === 'horizontal' ? 'mt-ws-11 px-ws-11' : 'mt-ws-16 px-ws-22',
        sharesRowWithClose && statusModalCloseGutter,
      )}
    >
      {resolvedStatus !== 'neutral' && (
        <StatusModalIcon status={resolvedStatus} orientation={resolvedOrientation} />
      )}
      <ModalPrimitive.Title
        data-slot="status-modal-title"
        className={cn('typography-subtitle-sm text-ws-static-strong', className)}
        {...props}
      />
    </div>
  );
};
StatusModalTitle.displayName = 'StatusModal.Title';

export { StatusModalTitle };
