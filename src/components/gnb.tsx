import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

const Gnb = () => {
    const navigate = useNavigate()
    const navigationList = [
        {label : '시작', path : '/'},
        {label : '로그인', path : '/signin'},
        {label : '회원가입', path : '/signup'},
        {label : '할 일', path : '/todo'}
    ]

    const accessToken = localStorage.getItem('accessToken')

    const handleLogOut = () => {
        alert('로그아웃 하시겠습니까?')
        localStorage.removeItem('accessToken')
        navigate('/')
    }

    return (
        <NavigationBar>
            {
                navigationList.map(({label, path }) => (
                    <Link to={path} key={path}>{label}</Link>
                ))
            }
            {
                accessToken && <button onClick={handleLogOut}>로그아웃</button>
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