import { RiCheckboxCircleFill, RiErrorWarningFill, RiInformationFill } from '@remixicon/react';
import * as React from 'react';

import type { StatusModalOrientation, StatusModalStatus } from './StatusModal.types';
import { statusModalIconVariants } from './StatusModal.variants';

const iconsMap: Record<Exclude<StatusModalStatus, 'neutral'>, typeof RiCheckboxCircleFill> = {
  error: RiErrorWarningFill,
  positive: RiCheckboxCircleFill,
  information: RiInformationFill,
  notice: RiErrorWarningFill,
};

type StatusModalIconProps = {
  status: Exclude<StatusModalStatus, 'neutral'>;
  orientation: StatusModalOrientation;
};

const StatusModalIcon = React.forwardRef<SVGSVGElement, StatusModalIconProps>(
  ({ status, orientation }, ref) => {
    const IconComponent = iconsMap[status];

    return (
      <IconComponent
        ref={ref}
        data-slot="status-modal-icon"
        className={statusModalIconVariants({ status, orientation })}
        aria-hidden
      />
    );
  },
);
StatusModalIcon.displayName = 'StatusModal.Icon';

export { StatusModalIcon };
