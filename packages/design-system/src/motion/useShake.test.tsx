import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TextInput } from '../components/text-input/TextInput';
import { useShake } from './useShake';

const ShakingTextInput = () => {
  const { ref, shake } = useShake<HTMLInputElement>();
  return (
    <>
      <TextInput ref={ref} aria-label="Email" />
      <button onClick={shake}>Submit</button>
    </>
  );
};

describe('useShake', () => {
  it('should set data-shake and animation listeners, then clean up when the animation ends', async () => {
    const addListener = vi.spyOn(document, 'addEventListener');
    render(<ShakingTextInput />);
    const input = screen.getByRole('textbox', { name: 'Email' });
    // The ref is the input; the field around it animates through `has-data-[shake=true]`.
    const field = input.parentElement!;

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(input).toHaveAttribute('data-shake', 'true');
    expect(field.className).toContain('has-data-[shake=true]:animate-');
    expect(addListener).toHaveBeenCalledWith('animationend', expect.any(Function));
    expect(addListener).toHaveBeenCalledWith('animationcancel', expect.any(Function));

    const animationEnd = new Event('animationend', { bubbles: true });
    Object.defineProperty(animationEnd, 'animationName', { value: 'ws-field-shake' });
    fireEvent(field, animationEnd);

    expect(input).not.toHaveAttribute('data-shake');
    addListener.mockRestore();
  });
});
