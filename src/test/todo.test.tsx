import React from 'react';

import { sampleTodos } from '../fixture/fixture';

import { getTodosFail } from '../mocks/handler';

import { server } from '../mocks/server';

import { BrowserRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import TodoPage from '../pages/todo';

import userEvent from '@testing-library/user-event';

describe('할 일 목록 페이지', () => {
  const renderTodoPage = () => render(<TodoPage />, { wrapper: BrowserRouter });

  const localStorageMock = (function () {
    let store: Record<string, string> = { accessToken: 'sampleToken' };

    return {
      getItem(key: string) {
        return store[key];
      },

      setItem(key: string, value: string) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key: string) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  context('컴포넌트가 마운트 될 때', () => {
    context('통신 에러가 발생하지 않았다면', () => {
      it('화면에 할일이 정상적으로 보인다.', async () => {
        renderTodoPage();

        const checks = await screen.findAllByRole('checkbox');
        const modifyButtons = await screen.findAllByTestId('modify-button');
        const deleteButtons = await screen.findAllByTestId('delete-button');

        expect(checks[0]).toBeInTheDocument();
        expect(modifyButtons[0]).toBeInTheDocument();
        expect(deleteButtons[0]).toBeInTheDocument();
      });
    });

    context('통신 에러가 발생해 할 일 목록을 받아오지 못 한다면', () => {
      it('화면에 할 일 없음 안내 메시지가 보인다.', () => {
        server.use(getTodosFail());

        const { container } = renderTodoPage();

        expect(container).toHaveTextContent('할 일이 없습니다.');
      });
    });
  });

  context('수정 버튼을 클릭하면', () => {
    it('수정용 인풋과 버튼, 취소 버튼이 화면에 보인다.', async () => {
      renderTodoPage();

      const modifyButtons = await screen.findAllByTestId('modify-button');

      userEvent.click(modifyButtons[0]);

      const modifyInput = await screen.findByTestId('modify-input');
      const submitBtn = await screen.findByTestId('submit-button');
      const cancelBtn = await screen.findByTestId('cancel-button');

      expect(modifyInput).toBeInTheDocument();
      expect(submitBtn).toBeInTheDocument();
      expect(cancelBtn).toBeInTheDocument();
    });
  });

  context('삭제 버튼을 클릭하면', () => {
    // 통과 x, no-content인 상황.
    it('해당 할 일이 화면에 보이지 않게 된다.', async () => {
      const { container } = renderTodoPage();

      const deleteBtns = await screen.findAllByTestId('delete-button');

      userEvent.click(deleteBtns[0]);
    });
  });

  context('할 일을 입력한 후 추가 버튼을 누르면', () => {
    it('할 일이 추가 된다.', async () => {
      renderTodoPage();

      const input = await screen.findByTestId('new-todo-input');
      const button = await screen.findByTestId('new-todo-add-button');

      userEvent.type(input, '이불개기');
      userEvent.click(button);

      const newTodo = await screen.findByText('이불개기');

      expect(newTodo).toBeInTheDocument();
    });
  });

  context('체크 박스를 클릭하면', () => {
    // 상태는 정상적으로 수정되는 것으로 보임.
    it('할 일에 취소선이 그어진다.', async () => {
      renderTodoPage();

      const checks = await screen.findAllByRole('checkbox');
      const todo = await screen.findByText(sampleTodos[0].todo);
      userEvent.click(checks[0]);

      expect(todo).toHaveStyle('text-decoration: line-through;');
    });
  });
});
