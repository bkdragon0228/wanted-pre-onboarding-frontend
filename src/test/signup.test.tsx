import React from 'react';

import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import SignupPage from '../pages/signup';

describe('회원가입 페이지', () => {
  const renderRegisterPage = () => {
    const { container } = render(
      <BrowserRouter>
        <SignupPage />
      </BrowserRouter>
    );

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const signupBtn = screen.getByTestId('signup-button');

    return {
      container,
      email,
      password,
      signupBtn,
    };
  };

  context('회원가입 페이지가 렌더링 되면', () => {
    it('회원가입용 이메일, 패스워드 인풋과 회원가입 버튼이 보여야 한다.', () => {
      const { email, password, signupBtn } = renderRegisterPage();

      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(signupBtn).toBeInTheDocument();
    });
  });
});
