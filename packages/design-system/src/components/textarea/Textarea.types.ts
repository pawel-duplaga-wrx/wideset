import type { VariantProps } from 'class-variance-authority';
import type { TextareaHTMLAttributes } from 'react';

import type { MotionProps } from '../../motion/Motion.types';
import type { textareaWrapperVariants } from './Textarea.variants';

/** A multiline text input. */
export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  MotionProps &
  VariantProps<typeof textareaWrapperVariants> & {
    /** Additional classes applied to the inner `<textarea>` element. `className` targets the outer wrapper. */
    contentClassName?: string;
    /**
     * Directions in which the user can resize the field by dragging its corner.
     * @default 'vertical'
     */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  };
