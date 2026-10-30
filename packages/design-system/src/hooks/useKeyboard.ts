import { useCallback, useState } from 'react';

interface UseKeyboardOptions {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
}

export function useKeyboard({ disabled, onClick, onKeyDown }: UseKeyboardOptions) {
  const [isPressed, setIsPressed] = useState(false);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented || disabled || !onClick) return;

      if (event.key === ' ') {
        event.preventDefault();
        setIsPressed(true);
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        onClick(event as unknown as React.MouseEvent<HTMLElement>);
      }
    },
    [disabled, onClick, onKeyDown],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled || !onClick || event.key !== ' ') return;

      event.preventDefault();
      setIsPressed(false);
      onClick(event as unknown as React.MouseEvent<HTMLElement>);
    },
    [disabled, onClick],
  );

  const handleBlur = useCallback(() => {
    setIsPressed(false);
  }, []);

  return { isPressed, handleKeyDown, handleKeyUp, handleBlur };
}
