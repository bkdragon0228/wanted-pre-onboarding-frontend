import React from 'react';

import styled from '@emotion/styled'
import { useForm } from '../../hook/useForm';

import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button'

const SignupPage = () => {
    const {handleSubmit, handleChange, errors} = useForm<{email : string; password : string;}>({
        initialValues : {
            email : '',
            password : ''
        },
        validations : {
            email : {
                required : {
                    value : true,
                    message : '입력해주세요.'
                },
                pattern : {
                    value : '^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$',
                    message : '이메일 형식에 맞게 작성해주세요.'
                },
            },
            password : {
                required : {
                    value : true,
                    message : '입력해주세요.'
                },
                custom : {
                    isValid : (password) => password.length > 7,
                    message : '비밀번호는 8자리 이상으로 작성해주세요.'
                },

            }
        },
        onSubmit : () => {
            console.log('검증 성공')
        }
    })

    return (
        <Form onSubmit={handleSubmit}>
            <Input type='text' dataTestId='email-input' placeholder='이메일' errorMessage={errors.email} onChange={handleChange('email')} />
            <Input type='password' dataTestId='password-input' placeholder='비밀번호' errorMessage={errors.password} onChange={handleChange('password')} />
            <Button dataTestId='signup-button' type='submit' onClick={() => {}} label='회원가입' />
        </Form>
    );
};

export default SignupPage;



