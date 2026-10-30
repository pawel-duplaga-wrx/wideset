import { cn } from 'src/lib/utils';

import { useListItemContext } from './ListItem.context';
import type { ListItemDescriptionProps } from './ListItem.types';
import { listItemDescriptionVariants } from './ListItem.variants';

export const ListItemDescription = ({
  children,
  className,
  ...props
}: ListItemDescriptionProps) => {
  const { variant, disabled } = useListItemContext();

  return (
    <div
      data-slot="list-item-description"
      className={cn(listItemDescriptionVariants({ variant, disabled: !!disabled }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

ListItemDescription.displayName = 'ListItem.Description';
