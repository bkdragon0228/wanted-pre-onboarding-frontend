import React, { ChangeEvent } from 'react';

import styled from '@emotion/styled'

interface InputProps {
    dataTestId : 'email-input' | 'password-input' | 'new-todo-input';
    placeholder : string;
    type : 'text' | 'password';
    errorMessage? : string | undefined;
    onChange : (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void;
}

const Input : React.FC<InputProps> = ({
    dataTestId,
    placeholder,
    type,
    errorMessage,
    onChange,
}) => {

    return (
        <>
            <StyledInput  type={type} data-testid={dataTestId} placeholder={placeholder} onChange={(e : ChangeEvent<HTMLInputElement & HTMLSelectElement>) => onChange(e)} />
            {errorMessage &&  <ErrorMessage>{errorMessage}</ErrorMessage>}
        </>
    );
};

export default Input;

const ErrorMessage = styled.p`
    color : red;
`
const StyledInput = styled.input`
    width: 700px;
    padding: 20px 16px;
    border: 1px solid lightgray;
    border-radius: 20px;
`