import React from 'react';

import styled from '@emotion/styled';
import useAuth from '../../hook/useAuth';
import useTodos from '../../hook/useTodos';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const TodoPage = () => {
    useAuth(true)

    const {todo, todos, handleTodo, createTodo, refetchTodo, deleteTodo, checkTodo} = useTodos()

    const handleCheck = (id : number, currentTodo : string ,isCompleted : boolean) => {
        checkTodo(id, currentTodo, isCompleted)
    }

    return (
        <div>
            <div>
                <Input type='text' dataTestId='new-todo-input' placeholder='할 일을 입력해주세요.' onChange={handleTodo}/>
                <Button type='button' dataTestId='new-todo-add-button' onClick={createTodo} label='할 일 추가'/>
            </div>
            <ul>
                {todos.map((item) => (
                        <Row key={item.id}>
                            <input type='checkbox' checked={item.isCompleted} onChange={() => handleCheck(item.id, item.todo, item.isCompleted)}/>
                            <Todo>{item.todo}</Todo>
                            <DeleteBtn onClick={() => deleteTodo(item.id)}>X</DeleteBtn>
                        </Row>
                ))}
            </ul>
        </div>
    );
};

export default TodoPage;

const Row = styled.li`
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
`

const Todo = styled.p`
    min-width: 100px;
    max-width: 200px;
    text-align: center;
    &:hover {
        text-decoration: underline;
    }
`

const DeleteBtn = styled.button`
    width: 50px;
    height: 50px;
    background-color: transparent;
    text-align: center;
    border: none;
    border-radius: 50%;

    &:hover {
        background-color: lightgray;
    }
`