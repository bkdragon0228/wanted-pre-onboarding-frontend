import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

const Gnb = () => {
    const navigationList = [
        {label : '시작', path : '/'},
        {label : '로그인', path : '/signin'},
        {label : '회원가입', path : '/signup'},
        {label : '할 일', path : '/todo'}
    ]

    return (
        <NavigationBar>
            {
                navigationList.map(({label, path }) => (
                    <Link to={path} key={path}>{label}</Link>
                ))
            }
        </NavigationBar>
    );
};

export default Gnb;

const NavigationBar = styled.nav`
    padding: 20px;
    margin: 0 auto;
    display: flex;
    column-gap: 1rem;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid lightgray;
`