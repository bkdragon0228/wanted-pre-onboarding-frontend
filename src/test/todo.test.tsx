import React from 'react';

import { sampleTodos } from '../fixture/fixture';

import { getTodosFail } from '../mocks/handler';

import { server } from '../mocks/server';

import { BrowserRouter } from 'react-router-dom';

import { findByText, render, screen } from '@testing-library/react';

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
});
