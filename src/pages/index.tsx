import React from 'react';
import useAuth from '../hook/useAuth';

const IndexPage = () => {
    useAuth(null)
    return (
        <div>
            인덱스 페이지
        </div>
    );
};

export default IndexPage;