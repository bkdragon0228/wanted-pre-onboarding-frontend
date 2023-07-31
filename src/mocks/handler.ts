import { rest } from 'msw';

import { sampleTodos } from '../fixture/fixture';

const baseUrl = 'https://www.pre-onboarding-selection-task.shop';

const paths = {
  todos: '/todos',
  signin: '/auth/signin',
  signup: '/auth/signup',
};

export const getTodos = () => {
  return rest.get(`${baseUrl}${paths.todos}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleTodos));
  });
};

export const getTodosFail = () => {
  return rest.get(`${baseUrl}${paths.todos}`, (_, res, ctx) => {
    return res(ctx.status(400));
  });
};

const deleteTodos = () => {
  return rest.delete(`${baseUrl}${paths.todos}/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(204),
      ctx.json([...sampleTodos.filter((todo) => todo.id !== Number(id))])
    );
  });
};

const createTodo = () => {
  return rest.post(`${baseUrl}${paths.todos}`, async (req, res, ctx) => {
    const { todo } = await req.json();

    return res(
      ctx.status(201),
      ctx.json({ id: 3, todo, isCompleted: false, userId: 1 })
    );
  });
};

const updateTodo = () => {
  return rest.put(`${baseUrl}${paths.todos}/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const { todo, isCompleted } = await req.json();

    const newData = { ...sampleTodos.find((todo) => todo.id === Number(id)) };

    if (todo) newData.todo = todo;
    if (isCompleted) newData.isCompleted = isCompleted;

    return res(ctx.status(200), ctx.json(newData));
  });
};
export const handlers = [getTodos(), deleteTodos(), createTodo(), updateTodo()];
