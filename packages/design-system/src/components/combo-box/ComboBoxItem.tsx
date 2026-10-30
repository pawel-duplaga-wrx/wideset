import React, { useCallback } from 'react';
import { cn } from 'src/lib/utils';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { ListItem } from '../list-item/ListItem';
import { useComboBoxContext } from './ComboBox.context';
import type { ComboBoxItemProps } from './ComboBox.types';
import { ComboBoxHighlightedLabel } from './ComboBoxHighlightedLabel';

const ComboBoxItem = React.forwardRef<HTMLLIElement, ComboBoxItemProps>(
  (
    {
      children,
      value,
      isHighlighted,
      className,
      onClick,
      onMouseEnter,
      defaultMotion,
      id,
      ...props
    },
    ref,
  ) => {
    const context = useComboBoxContext();
    const motion = useDefaultMotion(defaultMotion ?? context.motion);
    const contextOption = context.filteredOptions.find((option) => option.value === value);
    const optionIndex = context.filteredOptions.findIndex((option) => option.value === value);

    const disabled = props.disabled ?? contextOption?.disabled;
    const isSelected = props.isSelected ?? context.currentValue === value;
    const itemVariant = props.variant ?? contextOption?.variant;
    const isItemHighlighted = isHighlighted ?? context.highlightedIndex === optionIndex;
    const itemChildren =
      children ??
      (contextOption ? (
        <>
          {contextOption.prefix && <ListItem.Prefix>{contextOption.prefix}</ListItem.Prefix>}
          <ListItem.Content>
            <ListItem.Label>
              <ComboBoxHighlightedLabel label={contextOption.label} search={context.search} />
            </ListItem.Label>
          </ListItem.Content>
        </>
      ) : null);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLLIElement>) => {
        if (disabled) return;

        if (contextOption) {
          context.onSelect(contextOption);
        } else {
          context.onOpenChange(false);
        }
        onClick?.(event);
      },
      [context, contextOption, onClick, disabled],
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLLIElement>) => {
        if (disabled) return;

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.currentTarget.click();
        }
      },
      [disabled],
    );

    const handleMouseEnter = useCallback(
      (event: React.MouseEvent<HTMLLIElement>) => {
        if (disabled || optionIndex < 0) return;

        context.onItemMouseEnter(optionIndex);
        onMouseEnter?.(event);
      },
      [context, disabled, onMouseEnter, optionIndex],
    );

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault();
    }, []);

    return (
      <li
        ref={ref}
        id={(optionIndex >= 0 && context.getOptionId?.(optionIndex)) || id}
        data-slot="combo-box-item"
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-highlighted={isItemHighlighted}
        data-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        className={cn('list-none', className)}
        {...props}
      >
        <ListItem
          variant={itemVariant}
          disabled={disabled}
          data-state={isSelected ? 'checked' : undefined}
          data-highlighted={isItemHighlighted || undefined}
          defaultMotion={motion}
          className={cn(
            // Figma pins the menu row's min-height to `Size/14` (32px); ListItem's
            // padding (Gap/3 + 20px content + Gap/3) only reaches 28px on its own.
            'min-h-ws-14',
            !isSelected &&
              isItemHighlighted &&
              !disabled &&
              (itemVariant === 'danger'
                ? 'bg-ws-dynamic-danger-alpha-default text-ws-dynamic-danger-default'
                : 'bg-ws-dynamic-secondary-alpha-hover text-ws-dynamic-secondary-default'),
          )}
        >
          <div className="gap-ws-5 flex min-w-0 flex-1 flex-row items-center overflow-hidden">
            {itemChildren}
          </div>
        </ListItem>
      </li>
    );
  },
);

ComboBoxItem.displayName = 'ComboBox.Item';

export { ComboBoxItem };
