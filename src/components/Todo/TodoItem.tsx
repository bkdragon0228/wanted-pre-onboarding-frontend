import React, { ChangeEvent, useState } from 'react';
import { Todo } from '../../hook/useTodos';

import styled from '@emotion/styled';
import Input from '../Input/Input';
import Button from '../Button/Button';

interface TodoItemProps {
    todoItem : Todo;
    handleCheck : <T extends {id : number, currentTodo : string; isCompleted : boolean}>(arg : T) => void;
    handleDelete : <T extends {id : number}>(arg : T) => void;
    handleUpdate : <T extends {id : number, value : string, isCompleted : boolean}>(arg : T) => void;
}

const TodoItem : React.FC<TodoItemProps> = ({
    todoItem,
    handleCheck,
    handleDelete,
    handleUpdate
}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editValue, setEditValue] = useState<string>(todoItem.todo)

    const handleValue = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        setEditValue(e.target.value)
    }

    const handleEdit = () => {
        setIsEdit((prev) => !prev)
    }

    const renderTodo = <T extends string>(isEdit : boolean, value : T) => {
        if(isEdit) {
            return (
                <div>
                    <Input type='text' dataTestId='modify-input' value={editValue} defaultValue={todoItem.todo} placeholder='수정할 일을 입력해주세요.' onChange={handleValue}/>
                    <Button
                        type='button'
                        dataTestId='submit-button'
                        label='수정'
                        disabled={editValue.length <= 0}
                        onClick={() => {
                            handleUpdate({
                                id : todoItem.id,
                                value : editValue,
                                isCompleted : todoItem.isCompleted
                            })
                            setIsEdit(false)
                        }}
                    />
                    <UpdateBtn data-testid="cancel-button" onClick={handleEdit}>취소</UpdateBtn>
                </div>
            )
        } else {
            return (
                <>
                    <input type='checkbox' checked={todoItem.isCompleted} onChange={() => handleCheck({ id : todoItem.id, currentTodo : todoItem.todo, isCompleted : todoItem.isCompleted})}/>
                    <TodoCotents isCompleted={todoItem.isCompleted}>
                        {value}
                    </TodoCotents>
                    <UpdateBtn data-testid="modify-button" onClick={handleEdit}>수정</UpdateBtn>
                    <DeleteBtn data-testid="delete-button" onClick={() => handleDelete({id : todoItem.id})} >X</DeleteBtn>
                </>
            )
        }
    }

    return (
        <Row>
            {
                renderTodo(isEdit, todoItem.todo)
            }
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

const TodoCotents = styled.p<{
    isCompleted : boolean
}>`
    min-width: 100px;
    max-width: 500px;
    text-align: center;
    text-decoration: ${({isCompleted}) => isCompleted ? 'line-through' : 'none'};
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
