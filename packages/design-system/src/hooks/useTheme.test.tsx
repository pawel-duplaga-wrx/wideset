import { act, renderHook, waitFor } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it } from 'vitest';

import { useTheme } from './useTheme';

const root = document.documentElement;

afterEach(() => root.classList.remove('dark'));

describe('useTheme', () => {
  describe('Initial value', () => {
    it('should be light when the root has no dark class', () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.isDarkTheme).toBe(false);
    });

    it('should be dark when the root already has the dark class', () => {
      root.classList.add('dark');

      const { result } = renderHook(() => useTheme());

      expect(result.current.isDarkTheme).toBe(true);
    });
  });

  describe('Setters', () => {
    it('should toggle the dark class on the root', async () => {
      const { result } = renderHook(() => useTheme());

      act(() => result.current.toggleTheme());

      expect(root).toHaveClass('dark');
      await waitFor(() => expect(result.current.isDarkTheme).toBe(true));

      act(() => result.current.toggleTheme());

      expect(root).not.toHaveClass('dark');
      await waitFor(() => expect(result.current.isDarkTheme).toBe(false));
    });

    it('should set dark and light explicitly', async () => {
      const { result } = renderHook(() => useTheme());

      act(() => result.current.setDarkTheme());
      await waitFor(() => expect(result.current.isDarkTheme).toBe(true));

      act(() => result.current.setLightTheme());
      await waitFor(() => expect(result.current.isDarkTheme).toBe(false));
    });
  });

  describe('Shared state', () => {
    it('should keep two callers in sync', async () => {
      const first = renderHook(() => useTheme());
      const second = renderHook(() => useTheme());

      act(() => first.result.current.setDarkTheme());

      await waitFor(() => expect(second.result.current.isDarkTheme).toBe(true));
    });

    it('should follow a class change made outside the hook', async () => {
      const { result } = renderHook(() => useTheme());

      act(() => root.classList.add('dark'));

      await waitFor(() => expect(result.current.isDarkTheme).toBe(true));
    });
  });

  describe('Server rendering', () => {
    it('should render without a document and report light', () => {
      const Probe = () => <span>{useTheme().isDarkTheme ? 'dark' : 'light'}</span>;
      // No `document` on the server: a bare read throws a ReferenceError.
      const saved = { document: globalThis.document, window: globalThis.window };
      Reflect.deleteProperty(globalThis, 'document');
      Reflect.deleteProperty(globalThis, 'window');
      let html = '';
      try {
        html = renderToString(<Probe />);
      } finally {
        Object.assign(globalThis, saved);
      }

      expect(html).toContain('light');
    });
  });
});
