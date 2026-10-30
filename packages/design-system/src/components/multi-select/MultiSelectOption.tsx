import type { ComponentProps } from 'react';

import { useDefaultMotion } from '../../motion/MotionProvider';
import { Checkbox } from '../checkbox/Checkbox';
import { DropdownMenu } from '../dropdown/DropdownMenu';
import { ListItem } from '../list-item/ListItem';
import { useSelectContext } from '../select/Select.context';
import { SelectOption } from '../select/SelectOption';
import type { MultiSelectOptionProps } from './MultiSelect.types';

export const MultiSelectOption = ({
  option,
  isDisabled,
  onSelect,
  defaultMotion,
  ...rest
}: MultiSelectOptionProps) => {
  const { motion: selectMotion } = useSelectContext();
  const motion = useDefaultMotion(defaultMotion ?? selectMotion);
  const checkedState = 'indeterminateState' in rest ? rest.indeterminateState : rest.isSelected;

  const handleSelect: NonNullable<ComponentProps<typeof DropdownMenu.CheckboxItem>['onSelect']> = (
    event,
  ) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    onSelect();
  };

  return (
    <DropdownMenu.CheckboxItem
      checked={checkedState}
      disabled={isDisabled}
      onSelect={handleSelect}
      textValue={option.label}
      asChild
    >
      <SelectOption
        data-slot="multi-select-option"
        shouldUsePrimitive={false}
        disabled={isDisabled}
        variant={option.variant}
        shouldDisplayCheckmark={false}
        defaultMotion={motion}
      >
        <ListItem.Prefix>
          <Checkbox
            checked={checkedState}
            disabled={isDisabled}
            className="pointer-events-none"
            tabIndex={-1}
            defaultMotion={motion}
          />
        </ListItem.Prefix>
        {option.prefix && <ListItem.Prefix>{option.prefix}</ListItem.Prefix>}
        <ListItem.Label>{option.label}</ListItem.Label>
      </SelectOption>
    </DropdownMenu.CheckboxItem>
  );
};

MultiSelectOption.displayName = 'MultiSelect.Option';
