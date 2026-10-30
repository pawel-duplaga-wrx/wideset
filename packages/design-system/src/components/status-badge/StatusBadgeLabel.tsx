import React from 'react';

const StatusBadgeLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} data-slot="status-badge-label" className={className} {...props}>
      {children}
    </div>
  ),
);
StatusBadgeLabel.displayName = 'StatusBadge.Label';

export { StatusBadgeLabel };
