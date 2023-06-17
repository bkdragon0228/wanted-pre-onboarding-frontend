import React from 'react';

import styled from '@emotion/styled'

interface ButtonProps {
    dataTestId : 'signup-button' | 'signin-button' | 'new-todo-add-button' | 'modify-button' | 'delete-button' | 'submit-button' | 'cancel-button';
    label? : string;
    onClick? : () => void;
    type : 'button' | 'submit';
    disabled? : boolean;
}

const Button : React.FC<ButtonProps> = ({
    dataTestId,
    onClick,
    type,
    disabled,
    label = '검색'
}) => {
    return (
       <StyledButton type={type} data-testid={dataTestId} onClick={onClick} disabled={disabled}>{label}</StyledButton>
    );
};

export default Button;

const StyledButton = styled.button`
    width: 150px;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius : 20px;
    cursor: pointer;

    &:hover {
        border: 1px solid black;
    }
`