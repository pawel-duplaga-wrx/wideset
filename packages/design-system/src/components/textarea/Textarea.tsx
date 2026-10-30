import * as React from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import type { TextareaProps } from './Textarea.types';
import {
  textareaMotionVariants,
  textareaVariants,
  textareaWrapperVariants,
} from './Textarea.variants';

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      disabled = false,
      resize = 'vertical',
      className,
      contentClassName,
      defaultMotion,
      ...props
    },
    ref,
  ) => {
    const motion = useDefaultMotion(defaultMotion);
    const canResizeHorizontally = resize === 'horizontal' || resize === 'both';
    const widthClass = props.cols
      ? `w-auto`
      : canResizeHorizontally
        ? `w-full`
        : `w-full max-w-full`;

    return (
      <div
        data-slot="textarea"
        className={cn(
          textareaWrapperVariants({ size, disabled, variant, resize }),
          textareaMotionVariants({ enabled: motion }),
          widthClass,
          className,
        )}
      >
        <textarea
          aria-invalid={variant === 'danger' || undefined}
          data-disabled={disabled || undefined}
          disabled={disabled}
          ref={ref}
          {...props}
          className={cn(textareaVariants({ size }), widthClass, contentClassName)}
        />
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
