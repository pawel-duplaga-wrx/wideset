import {
  createContext,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { SelectOptionType } from '../select/Select.types';
import type { ComboBoxContextValue, ComboBoxRootProps } from './ComboBox.types';

export const ComboBoxContext = createContext<ComboBoxContextValue | undefined>(undefined);

export function useCreateComboBoxContextValue({
  options = [],
  value,
  defaultValue,
  clearable,
  disallowCustomValue,
  disabled,
  open,
  defaultOpen,
  onOpenChange,
  onChange,
  onClear,
}: ComboBoxRootProps): ComboBoxContextValue {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const [search, setSearch] = useState('');
  const contentId = useId();

  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isOpenControlled = open !== undefined;
  const isOpen = isOpenControlled ? open : internalOpen;

  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === currentValue),
    [currentValue, options],
  );

  const filteredOptions = useMemo(
    () =>
      search
        ? options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
        : options,
    [options, search],
  );

  const getFirstEnabledIndex = useCallback(
    () => filteredOptions.findIndex((option) => !option.disabled),
    [filteredOptions],
  );

  const getLastEnabledIndex = useCallback(() => {
    for (let index = filteredOptions.length - 1; index >= 0; index -= 1) {
      if (!filteredOptions[index]?.disabled) return index;
    }

    return -1;
  }, [filteredOptions]);

  const getSelectedEnabledIndex = useCallback(
    () => filteredOptions.findIndex((option) => option.value === currentValue && !option.disabled),
    [currentValue, filteredOptions],
  );

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isOpenControlled, onOpenChange],
  );

  const setValue = useCallback(
    (nextValue: string) => {
      if (!isControlled) setInternalValue(nextValue);
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  useEffect(() => {
    if (!search) return;

    setHighlightedIndex(getFirstEnabledIndex());
  }, [getFirstEnabledIndex, search]);

  useEffect(() => {
    if (!filteredOptions.length) {
      setHighlightedIndex(-1);
      return;
    }

    setHighlightedIndex((previousIndex) => {
      if (filteredOptions[previousIndex] && !filteredOptions[previousIndex].disabled) {
        return previousIndex;
      }

      return getFirstEnabledIndex();
    });
  }, [filteredOptions, getFirstEnabledIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const selectedEnabledIndex = getSelectedEnabledIndex();
    setHighlightedIndex(selectedEnabledIndex >= 0 ? selectedEnabledIndex : getFirstEnabledIndex());
  }, [isOpen, getFirstEnabledIndex, getSelectedEnabledIndex]);

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      inputRef.current?.focus();
      if (disallowCustomValue && !search && selectedOption?.label) {
        inputRef.current?.select();
      }
    });
  }, [isOpen, disallowCustomValue, search, selectedOption?.label]);

  const handleSelect = useCallback(
    (option: SelectOptionType) => {
      if (disabled || option.disabled) return;

      setValue(option.value);
      setSearch('');
      setOpenState(false);
    },
    [disabled, setValue, setOpenState],
  );

  const handleClear = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setValue('');
      setSearch('');
      onClear?.();
      setOpenState(false);
    },
    [setValue, onClear, setOpenState],
  );

  const handleInputChange = useCallback(
    (nextValue: string) => {
      if (disabled) return;

      if (!disallowCustomValue) {
        setValue(nextValue);
      } else if (nextValue === '') {
        setValue('');
      }

      setSearch(nextValue);
    },
    [disabled, disallowCustomValue, setValue],
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (disabled) return;

      if (!nextOpen && disallowCustomValue) setSearch('');

      setOpenState(nextOpen);
    },
    [disabled, disallowCustomValue, setOpenState],
  );

  const getNextEnabledIndex = useCallback(
    (currentIndex: number, direction: 1 | -1): number => {
      if (!filteredOptions.length) return -1;

      if (currentIndex < 0) {
        return direction === 1 ? getFirstEnabledIndex() : getLastEnabledIndex();
      }

      for (let step = 1; step <= filteredOptions.length; step += 1) {
        const nextIndex =
          (currentIndex + step * direction + filteredOptions.length) % filteredOptions.length;
        if (!filteredOptions[nextIndex]?.disabled) return nextIndex;
      }

      return currentIndex;
    },
    [filteredOptions, getFirstEnabledIndex, getLastEnabledIndex],
  );

  const handleInputKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          if (!isOpen) {
            setOpenState(true);
          } else {
            setHighlightedIndex((previousIndex) => getNextEnabledIndex(previousIndex, 1));
          }
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          if (isOpen) {
            setHighlightedIndex((previousIndex) => getNextEnabledIndex(previousIndex, -1));
          }
          break;
        }
        case 'Enter': {
          event.preventDefault();
          if (
            isOpen &&
            filteredOptions[highlightedIndex] &&
            !filteredOptions[highlightedIndex].disabled
          ) {
            handleSelect(filteredOptions[highlightedIndex]);
          } else if (!disallowCustomValue) {
            setOpenState(false);
          }
          break;
        }
        case 'Escape': {
          event.preventDefault();
          setSearch('');
          setOpenState(false);
          break;
        }
        case 'Tab': {
          if (isOpen) {
            if (disallowCustomValue) setSearch('');
            setOpenState(false);
          }
          break;
        }
      }
    },
    [
      isOpen,
      disallowCustomValue,
      filteredOptions,
      getNextEnabledIndex,
      handleSelect,
      highlightedIndex,
      setOpenState,
    ],
  );

  const handleInputBlur = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (disallowCustomValue) setSearch('');

    setOpenState(false);
  }, [disallowCustomValue, setOpenState]);

  const getOptionId = useCallback((index: number) => `${contentId}-option-${index}`, [contentId]);

  const handleItemMouseEnter = useCallback((index: number) => {
    if (index < 0) return;

    setHighlightedIndex(index);
  }, []);

  return {
    contentId,
    open: isOpen,
    onOpenChange: handleOpenChange,
    options,
    inputRef,
    currentValue,
    search,
    disallowCustomValue,
    displayedLabel: selectedOption?.label ?? (disallowCustomValue ? '' : currentValue),
    inputValue: disallowCustomValue
      ? search || selectedOption?.label || ''
      : (selectedOption?.label ?? currentValue),
    hasClearButton: Boolean(clearable && !disabled && (currentValue !== '' || search !== '')),
    filteredOptions,
    highlightedIndex,
    getOptionId,
    activeDescendantId:
      isOpen && filteredOptions[highlightedIndex] ? getOptionId(highlightedIndex) : undefined,
    onInputChange: handleInputChange,
    onInputKeyDown: handleInputKeyDown,
    onInputBlur: handleInputBlur,
    onSelect: handleSelect,
    onItemMouseEnter: handleItemMouseEnter,
    onClear: handleClear,
  };
}

export const useComboBoxContext = () => {
  const context = useContext(ComboBoxContext);

  if (context === undefined) {
    throw new Error('useComboBoxContext must be used within a ComboBox');
  }

  return context;
};
