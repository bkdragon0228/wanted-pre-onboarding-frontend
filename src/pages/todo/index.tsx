import React, { useCallback, useEffect, useState } from 'react';
import useAuth from '../../hook/useAuth';
import Axios from '../../util/httpRequest';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import useTodos from '../../hook/useTodos';

interface Todo {
    id : number;
    todo : string;
    isCompleted : boolean;
    userId : number;
}

type Todos = Todo[]

const TodoPage = () => {
    useAuth(true)

    const {todo, todos, handleTodo, createTodo, refetchTodo} = useTodos()

    return (
        <div>
            <div>
                <Input type='text' dataTestId='new-todo-input' placeholder='할 일을 입력해주세요.' onChange={handleTodo}/>
                <Button type='button' dataTestId='new-todo-add-button' onClick={createTodo} label='할 일 추가'/>
            </div>
            <ul>
                {todos.map((item) => (
                    <li>{item.todo}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoPage;