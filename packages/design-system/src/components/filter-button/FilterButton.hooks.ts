import { type KeyboardEvent, useCallback, useRef, useState } from 'react';

type UseKeyboardNavigationParams = {
  itemCount: number;
  isDisabled?: (index: number) => boolean;
  onSelect: (index: number) => void;
  loop?: boolean;
};

export function useKeyboardNavigation({
  itemCount,
  isDisabled,
  onSelect,
  loop = true,
}: UseKeyboardNavigationParams) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  const focusIndex = useCallback((index: number) => {
    setActiveIndex(index);
    itemRefs.current[index]?.focus();
  }, []);

  const findEnabled = useCallback(
    (from: number, direction: 1 | -1) => {
      if (itemCount === 0) return -1;

      let next = from;

      for (let step = 0; step < itemCount; step++) {
        next += direction;

        if (next >= itemCount) {
          if (!loop) return -1;
          next = 0;
        } else if (next < 0) {
          if (!loop) return -1;
          next = itemCount - 1;
        }

        if (!isDisabled?.(next)) return next;
      }

      return -1;
    },
    [itemCount, isDisabled, loop],
  );

  const focusFirstEnabled = useCallback(() => {
    const index = findEnabled(-1, 1);
    if (index !== -1) focusIndex(index);
  }, [findEnabled, focusIndex]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>, index: number) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp': {
          event.preventDefault();
          const next = findEnabled(index, event.key === 'ArrowDown' ? 1 : -1);
          if (next !== -1) focusIndex(next);
          break;
        }
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (!isDisabled?.(index)) onSelect(index);
          break;
      }
    },
    [findEnabled, focusIndex, isDisabled, onSelect],
  );

  const getItemProps = useCallback(
    (index: number) => ({
      ref: (el: HTMLElement | null) => {
        itemRefs.current[index] = el;
      },
      tabIndex: activeIndex === index ? 0 : -1,
      onKeyDown: (event: KeyboardEvent<HTMLElement>) => handleKeyDown(event, index),
      onFocus: () => setActiveIndex(index),
    }),
    [activeIndex, handleKeyDown],
  );

  return { getItemProps, focusFirstEnabled, activeIndex };
}
