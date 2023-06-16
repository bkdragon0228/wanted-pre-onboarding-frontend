import React from 'react';

import styled from '@emotion/styled';
import useAuth from '../../hook/useAuth';
import useTodos from '../../hook/useTodos';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const TodoPage = () => {
    useAuth(true)

    const {todo, todos, handleTodo, createTodo, refetchTodo, deleteTodo} = useTodos()

    return (
        <div>
            <div>
                <Input type='text' dataTestId='new-todo-input' placeholder='할 일을 입력해주세요.' onChange={handleTodo}/>
                <Button type='button' dataTestId='new-todo-add-button' onClick={createTodo} label='할 일 추가'/>
            </div>
            <ul>
                {todos.map((item) => (
                        <Row>
                            <input type='checkbox' checked={item.isCompleted} />
                            <p>{item.todo}</p>
                            <button onClick={() => deleteTodo(item.id)}>X</button>
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
`