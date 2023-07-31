import React, { useEffect } from 'react';

import { useForm } from '../../hook/useForm';
import Axios from '../../util/httpRequest';

import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import useMove from '../../hook/useMove';
import useAuth from '../../hook/useAuth';

export interface RegisterForm {
  email: string;
  password: string;
}

const SignupPage = () => {
  const accessToken = localStorage.getItem('accessToken');

  const { isLogin, moveToTodo, isLoading } = useAuth(accessToken);

  const { moveToPage } = useMove();
  const { isDisabled, handleSubmit, handleChange, errors, data } =
    useForm<RegisterForm>({
      initialValues: {
        email: '',
        password: '',
      },
      validations: {
        email: {
          required: {
            value: true,
            message: '입력해주세요.',
          },
          pattern: {
            value:
              '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
            message: '이메일 형식에 맞게 작성해주세요.',
          },
        },
        password: {
          required: {
            value: true,
            message: '입력해주세요.',
          },
          custom: {
            isValid: (password) => password.length >= 8,
            message: '비밀번호는 8자리 이상으로 작성해주세요.',
          },
        },
      },
      onSubmit: (data) => {
        console.log('검증 성공');
        register(data, () => moveToPage('/signin'));
      },
    });

  const register = async (data: RegisterForm, onComplete?: () => void) => {
    try {
      const response = await Axios.use<RegisterForm>({
        method: 'post',
        url: '/auth/signup',
        data: {
          email: data.email,
          password: data.password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoading) return;
    if (isLogin) moveToTodo();
  }, [isLogin, isLoading]);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        dataTestId="email-input"
        value={data.email}
        placeholder="이메일"
        errorMessage={errors.email}
        onChange={handleChange('email')}
      />
      <Input
        type="password"
        dataTestId="password-input"
        value={data.password}
        placeholder="비밀번호"
        errorMessage={errors.password}
        onChange={handleChange('password')}
      />
      <Button
        dataTestId="signup-button"
        type="submit"
        label="회원가입"
        disabled={isDisabled}
      />
    </Form>
  );
};

export default SignupPage;
