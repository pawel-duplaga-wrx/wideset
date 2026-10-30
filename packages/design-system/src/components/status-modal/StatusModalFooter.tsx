import { cn } from 'src/lib/utils';

import { useStatusModal } from './StatusModal.context';
import type { StatusModalFooterProps } from './StatusModal.types';

const StatusModalFooter = ({ orientation, className, ...props }: StatusModalFooterProps) => {
  const { orientation: contextOrientation } = useStatusModal();
  const resolvedOrientation = orientation ?? contextOrientation;

  return (
    <div
      data-slot="status-modal-footer"
      className={cn(
        'gap-ws-5 flex',
        resolvedOrientation === 'horizontal'
          ? 'bg-ws-static-overlay border-ws-static-base mt-ws-11 px-ws-11 py-ws-9 justify-end border-t'
          : 'mt-ws-12 px-ws-22 pb-ws-16 justify-center',
        className,
      )}
      {...props}
    />
  );
};
StatusModalFooter.displayName = 'StatusModal.Footer';

export { StatusModalFooter };
