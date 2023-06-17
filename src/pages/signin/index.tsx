import React from 'react';

import styled from '@emotion/styled';
import { RegisterForm } from '../signup/index';

import { useForm } from '../../hook/useForm';
import useMove from '../../hook/useMove';

import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button'
import Axios from '../../util/httpRequest';
import useAuth from '../../hook/useAuth';

type LoginForm = RegisterForm

const SigninPage = () => {
    useAuth(false)

    const { moveToPage } = useMove()

    const { isDisabled, handleSubmit, handleChange, errors, data } = useForm<LoginForm>({
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
        onSubmit : (data) => {
            console.log('검증 성공')
            login(data, (value) => {
                localStorage.setItem('accessToken' , value)
                moveToPage('/todo')
            })
        }
    })

    const login = async <TResponse extends { access_token : string }>(data : LoginForm, onComplete? : (value : string) => void) => {
        try {
            const response = await Axios.use<LoginForm, TResponse>({
                method : 'post',
                url : '/auth/signin',
                data : {
                    email : data.email,
                    password : data.password
                },
                headers : {
                    "Content-Type" : 'application/json'
                }
            })

            console.log(response.data.access_token)

            if(onComplete) {
                onComplete(response.data.access_token)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input type='text' dataTestId='email-input' value={data.email} placeholder='이메일' errorMessage={errors.email} onChange={handleChange('email')} />
            <Input type='password' dataTestId='password-input' value={data.password} placeholder='비밀번호' errorMessage={errors.password} onChange={handleChange('password')} />
            <RowWrapper>
                <Button dataTestId='signin-button' type='submit' label='로그인' disabled={isDisabled} />
                <Button dataTestId='signup-button' type='button' label='회원가입' onClick={() => moveToPage('/signup')}/>
            </RowWrapper>
        </Form>
    );
};

export default SigninPage;

const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
`