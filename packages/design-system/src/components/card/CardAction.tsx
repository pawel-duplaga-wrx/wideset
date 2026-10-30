import { cn } from 'src/lib/utils';

import type { CardActionProps } from './Card.types';

const CardAction = ({ className, children, ...props }: CardActionProps) => (
  <div data-slot="card-action" className={cn('flex', className)} {...props}>
    {children}
  </div>
);

CardAction.displayName = 'Card.Action';

export { CardAction };
