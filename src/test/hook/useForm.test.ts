import React from 'react';

import { act } from 'react-dom/test-utils';

import { renderHook } from '@testing-library/react';

import { initalFormSetting } from '../../fixture/fixture';

import { useForm } from '../../hook/useForm';

describe('useForm', () => {
  // 이메일과 비밀번호의 pattern을 주어진 조건에 맞게
  const settingTestHook = () => {
    const { result } = renderHook(() => useForm(initalFormSetting));

    return {
      result,
    };
  };

  context('이메일을 형식에 맞지 않게 입력하면', () => {
    it('이메일 형식 에러메시지를 생성한다.', async () => {
      const { result } = settingTestHook();

      const handleEmailChange = result.current.handleChange('email');

      act(() => {
        handleEmailChange('abc1234');
      });

      expect(result.current.data?.email).toBe('abc1234');
      expect(result.current.errors.email).toBe(
        '이메일 형식에 맞게 작성해주세요.'
      );
    });
  });

  context('비밀번호를 8자리 이상 입력 하지 않으면', () => {
    it('비밀번호 형식 에러메시지를 생성한다.', () => {
      const { result } = settingTestHook();

      const handlePasswordChange = result.current.handleChange('password');

      act(() => {
        handlePasswordChange('1234567');
      });

      expect(result.current.data?.password).toBe('1234567');
      expect(result.current.errors.password).toBe(
        '비밀번호는 8자리 이상으로 작성해주세요.'
      );
    });
  });

  context('이메일과 비밀번호를 주어진 형식에 맞게 입력하면', () => {
    it('email과 password가 정상적으로 변경되고 error 메시지가 생성되지 않는다.', () => {
      const { result } = settingTestHook();

      const handleEmailChange = result.current.handleChange('email');
      const handlePasswordChange = result.current.handleChange('password');

      act(() => {
        handleEmailChange('abc@gmail.com');
      });

      expect(result.current.data.email).toBe('abc@gmail.com');
      expect(result.current.errors?.email).toBeUndefined();

      act(() => {
        handlePasswordChange('12345678');
      });

      expect(result.current.data.password).toBe('12345678');
      expect(result.current.errors?.password).toBeUndefined();
    });
  });
});
