import React from 'react';
import useAuth from '../../hook/useAuth';

const TodoPage = () => {
    useAuth(true)

    return (
        <div>
            로그인 해야지만 접속할 수 있는 할 일 목록 페이지
        </div>
    );
};

export default TodoPage;