import React, { useState } from 'react';
import { Todo } from '../../hook/useTodos';

import styled from '@emotion/styled';

interface TodoItemProps {
    todo : Todo;
    handleCheck : <T extends {id : number, currentTodo : string; isCompleted : boolean}>(arg : T) => void;
    handleDelete : <T extends {id : number}>(arg : T) => void
}

const TodoItem : React.FC<TodoItemProps> = ({
    todo,
    handleCheck,
    handleDelete
}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const handleEdit = () => {
        setIsEdit((prev) => !prev)
    }

    const renderTodo = <T extends string>(isEdit : boolean, value : T) => {
        if(isEdit) {
            return (
                <div>
                    수정해야지~
                </div>
            )
        } else {
            return (
                <TodoCotents>
                    {value}
                </TodoCotents>
            )
        }
    }

    return (
        <Row>
            <input type='checkbox' checked={todo.isCompleted} onChange={() => handleCheck({ id : todo.id, currentTodo : todo.todo, isCompleted : todo.isCompleted})}/>
            {
                renderTodo(isEdit, todo.todo)
            }
            <UpdateBtn data-testid="modify-button" onClick={handleEdit}>{isEdit ? '수정 취소' : '수정'}</UpdateBtn>
            <DeleteBtn data-testid="delete-button" onClick={() => handleDelete({id : todo.id})} >X</DeleteBtn>
        </Row>
    );
};

export default TodoItem;

const Row = styled.li`
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    align-items: center;
`

const TodoCotents = styled.p`
    min-width: 100px;
    max-width: 500px;
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
const UpdateBtn = styled.button`
    width: 100px;
    padding: 10px;
    text-align: center;
    background-color: dodgerblue;
    color : white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
`
