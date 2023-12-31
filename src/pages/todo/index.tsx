import React, { useEffect } from 'react';

import useAuth from '../../hook/useAuth';
import useTodos from '../../hook/useTodos';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import TodoItem from '../../components/Todo/TodoItem';

const TodoPage = () => {
  const accessToken = localStorage.getItem('accessToken');

  const { isLogin, moveToLogin, isLoading } = useAuth(accessToken);

  const {
    todo,
    todos,
    handleTodo,
    createTodo,
    deleteTodo,
    checkTodo,
    updateTodo,
  } = useTodos();

  const handleCheck = <
    T extends { id: number; currentTodo: string; isCompleted: boolean }
  >(
    arg: T
  ) => {
    checkTodo(arg.id, arg.currentTodo, arg.isCompleted);
  };

  const handleDelete = <T extends { id: number }>({ id }: T) => {
    deleteTodo(id);
  };

  const handleUpdate = <
    T extends { id: number; value: string; isCompleted: boolean }
  >(
    arg: T
  ) => {
    updateTodo(arg.id, arg.value, arg.isCompleted);
  };

  useEffect(() => {
    if (isLoading) return;

    if (!isLogin) moveToLogin();
  }, [isLogin, moveToLogin, isLoading]);

  return (
    <div>
      <div>
        <Input
          type="text"
          dataTestId="new-todo-input"
          value={todo}
          placeholder="할 일을 입력해주세요."
          onChange={handleTodo}
        />
        <Button
          type="button"
          dataTestId="new-todo-add-button"
          onClick={createTodo}
          label="할 일 추가"
          disabled={todo.length <= 0}
        />
      </div>
      <ul>
        {!todos.length && <div>할 일이 없습니다.</div>}
        {todos.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            todoItem={todoItem}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;
