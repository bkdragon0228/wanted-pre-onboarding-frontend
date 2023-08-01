import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { renderHook } from '@testing-library/react';

import useAuth from '../../hook/useAuth';

describe('useAuth', () => {
  const settingTestHook = (accessToken: string | null) => {
    const { result } = renderHook(() => useAuth(accessToken), {
      wrapper: BrowserRouter,
    });

    return {
      result,
    };
  };

  context('accessToken이 없으면', () => {
    it('isLogin이 false', () => {
      const { result } = settingTestHook(null);

      expect(result.current.isLogin).toBe(false);
    });
  });

  context('accessToken이 있으면', () => {
    it('isLogin이 true', () => {
      const { result } = settingTestHook('sampleToken');

      expect(result.current.isLogin).toBe(true);
    });
  });
});
