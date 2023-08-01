import React from 'react';

import { renderHook, waitFor } from '@testing-library/react';

import useTodos from '../../hook/useTodos';
import { act } from 'react-dom/test-utils';

describe('useTodos', () => {
  const setUpCustomHook = () => renderHook(() => useTodos());

  const localStorageMock = (function () {
    let store: Record<string, string> = { accessToken: 'sampleToken' };

    return {
      getItem(key: string) {
        return store[key];
      },

      setItem(key: string, value: string) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key: string) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  context('useTodos를 호출하면', () => {
    it('todo에 두개의 할 일이 들어있다.', async () => {
      const { result } = setUpCustomHook();

      await act(async () => {
        result.current.refetchTodo();
      });

      expect(result.current.todos).toHaveLength(2);
    });
  });

  context('deleteTodo', () => {
    it('특정 할 일이 삭제 된다.', async () => {
      const { result } = setUpCustomHook();

      await act(async () => {
        result.current.refetchTodo();
      });

      await act(async () => {
        result.current.deleteTodo(1);
      });

      expect(result.current.todos).toHaveLength(1);
    });
  });
});
