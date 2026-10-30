import { cn } from 'src/lib/utils';

import { ScrollArea } from '../scroll-area/ScrollArea';
import { useCardContext } from './Card.context';
import type { CardContentProps } from './Card.types';
import { cardContentVariants } from './Card.variants';

const CardContent = ({ className, contentClassName, ...props }: CardContentProps) => {
  const { variant } = useCardContext();

  return (
    <ScrollArea data-slot="card-content" className={cn('grow', className)}>
      <div className={cn(cardContentVariants({ variant }), contentClassName)} {...props} />
    </ScrollArea>
  );
};

CardContent.displayName = 'Card.Content';

export { CardContent };
