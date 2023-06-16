import React, { useCallback, useEffect } from 'react';
import useAuth from '../../hook/useAuth';
import Axios from '../../util/httpRequest';

interface Todo {
    id : number;
    todo : string;
    isCompleted : boolean;
    userId : number;
}

type Todos = Todo[]

const TodoPage = () => {
    useAuth(true)

    const fetchTodoData = async (accessToken : string) => {
        if(!accessToken) return
        try {
            const resopnse = await Axios.use<{}, Todos>({
                method : 'get',
                url : '/todos',
                headers : {
                    Authorization : `Bearer ${accessToken}`
                }
            })

            console.log(resopnse.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken')
        fetchTodoData(accessToken ? accessToken : '')
    }, [])
    return (
        <div>
            로그인 해야지만 접속할 수 있는 할 일 목록 페이지
        </div>
    );
};

export default TodoPage;