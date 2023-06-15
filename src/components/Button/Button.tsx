import React from 'react';

interface ButtonProps {
    dataTestId : 'signup-button' | 'signin-button';
    label? : string;
    onClick : () => void;
    type : 'button' | 'submit'
}

const Button : React.FC<ButtonProps> = ({
    dataTestId,
    onClick,
    type,
    label = '검색'
}) => {
    return (
       <button type={type} data-testid={dataTestId} onClick={onClick}>{label}</button>
    );
};

export default Button;