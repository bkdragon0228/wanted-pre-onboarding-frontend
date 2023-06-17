import React, { useState } from 'react';

import useAuth from '../../hook/useAuth';
import useTodos from '../../hook/useTodos';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import TodoItem from '../../components/Todo/TodoItem';

const TodoPage = () => {
    useAuth(true)

    const {todo, todos, handleTodo, createTodo, refetchTodo, deleteTodo, checkTodo} = useTodos()

    const handleCheck = <T extends {id : number, currentTodo : string; isCompleted : boolean}>(arg : T) => {
        checkTodo(arg.id, arg.currentTodo, arg.isCompleted)
    }

    const handleDelete = <T extends {id : number}>({id} : T) => {
        deleteTodo(id)
    }

    return (
        <div>
            <div>
                <Input type='text' dataTestId='new-todo-input' placeholder='할 일을 입력해주세요.' onChange={handleTodo}/>
                <Button type='button' dataTestId='new-todo-add-button' onClick={createTodo} label='할 일 추가' disabled={todo.length <= 0}/>
            </div>
            <ul>
                {todos.map((todo) => (
                   <TodoItem
                        key={todo.id}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                        todo={todo}
                   />
                ))}
            </ul>
        </div>
    )
};

export default TodoPage;

