import React, { useState } from 'react';

import styled from '@emotion/styled'

import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button'

const SignupPage = () => {
    const [inputs, setInputs] = useState({
        email : '',
        password : ''
      })

    type InputId = keyof typeof inputs

    const handleInputs = (key : InputId) => (value : string) => {
        setInputs((prev) => {
            return {
                ...prev,
                [key] : value
            }
        })
    }

    return (
        <Form>
            <Input type='text' dataTestId='email-input' placeholder='이메일' errorMessage='' onChange={handleInputs('email')} />
            <Input type='password' dataTestId='password-input' placeholder='비밀번호' errorMessage='' onChange={handleInputs('password')} />
            <Button dataTestId='signup-button' type='submit' onClick={() => {}} label='회원가입' />
        </Form>
    );
};

export default SignupPage;



