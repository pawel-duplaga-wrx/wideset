import { RiCloseLine } from '@remixicon/react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { useSelectContext } from '../select/Select.context';
import { Tag } from '../tag/Tag';
import { iconButtonIconVariants, iconButtonVariants } from '../tag/Tag.variants';
import type { MultiSelectValueProps } from './MultiSelect.types';
import { multiSelectTagRemoveMotionVariants } from './MultiSelect.variants';

export const MultiSelectValue = ({
  hasValue,
  placeholder,
  areTagsVisible,
  selectedOptions,
  size,
  hasClearButton,
  multiValuesLabel,
  onRemoveValue,
  wrap,
  defaultMotion,
}: MultiSelectValueProps) => {
  const { motion: selectMotion } = useSelectContext();
  const motion = useDefaultMotion(defaultMotion ?? selectMotion);

  if (!hasValue) {
    return (
      <span data-slot="multi-select-value" className="text-ws-static-subtle truncate">
        {placeholder}
      </span>
    );
  }

  const handleRemovePointerDown = (event: React.SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleRemoveClick = (optionValue: string) => {
    onRemoveValue(optionValue);
  };

  if (areTagsVisible) {
    return (
      <div
        data-slot="multi-select-value"
        className={cn(
          'flex min-w-0 flex-1 items-center',
          wrap ? 'flex-wrap' : 'overflow-hidden',
          size === 'lg' ? 'gap-[0.375rem]' : 'gap-ws-3',
        )}
      >
        {selectedOptions.map((option) => (
          <Tag key={option.value} size={size} color="secondary" preset="filled">
            {option.label}
            <span
              aria-hidden="true"
              onClick={() => handleRemoveClick(option.value)}
              onPointerDown={handleRemovePointerDown}
              onMouseDown={handleRemovePointerDown}
              className={cn(
                'inline-flex cursor-pointer items-center justify-center rounded-full',
                iconButtonVariants({ size }),
                multiSelectTagRemoveMotionVariants({ enabled: motion }),
              )}
            >
              <RiCloseLine
                aria-hidden="true"
                focusable="false"
                className={cn(iconButtonIconVariants({ size, color: 'secondary' }))}
              />
            </span>
          </Tag>
        ))}
      </div>
    );
  }

  return (
    <span data-slot="multi-select-value" className={cn('truncate', hasClearButton && 'pr-ws-11')}>
      {`${selectedOptions.length} ${
        multiValuesLabel ?? (selectedOptions.length === 1 ? 'value selected' : 'values selected')
      }`}
    </span>
  );
};
