import { cn } from 'src/lib/utils';

import { useCardContext } from './Card.context';
import type { CardMediaProps } from './Card.types';
import { cardMediaVariants } from './Card.variants';

const CardMedia = ({ ratio = '16/9', className, children, style, ...props }: CardMediaProps) => {
  const { variant } = useCardContext();

  return (
    <div
      data-slot="card-media"
      className={cn(cardMediaVariants({ variant }), className)}
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

CardMedia.displayName = 'Card.Media';

export { CardMedia };
