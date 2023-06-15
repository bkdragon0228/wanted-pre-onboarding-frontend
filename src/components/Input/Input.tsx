import React from 'react';

import styled from '@emotion/styled'

interface InputProps {
    dataTestId : 'email-input' | 'password-input';
    placeholder : string;
    type : 'text' | 'password';
    errorMessage : string;
    onChange : (value : string) => void;
}

const Input : React.FC<InputProps> = ({
    dataTestId,
    placeholder,
    type,
    errorMessage,
    onChange
}) => {

    return (
        <>
            <input type={type} data-testid={dataTestId} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
            {errorMessage &&  <ErrorMessage>{errorMessage}</ErrorMessage>}
        </>
    );
};

export default Input;

const ErrorMessage = styled.p`
    color : red
`