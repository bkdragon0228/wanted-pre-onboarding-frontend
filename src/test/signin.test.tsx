import React from 'react';

import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import SigninPage from '../pages/signin';

describe('로그인 페이지', () => {
  const renderLoginPage = () => {
    const { container } = render(
      <BrowserRouter>
        <SigninPage />
      </BrowserRouter>
    );

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const signinBtn = screen.getByTestId('signin-button');

    return {
      container,
      email,
      password,
      signinBtn,
    };
  };

  context('로그인 페이지가 렌더링 되면', () => {
    it('로그인용 이메일, 패스워드 인풋과 로그인 버튼이 보여야 한다.', () => {
      const { email, password, signinBtn } = renderLoginPage();

      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(signinBtn).toBeInTheDocument();
    });
  });
});
