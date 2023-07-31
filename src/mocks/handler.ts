import { rest } from 'msw';

import { sampleTodos } from '../fixture/fixture';

const baseUrl = 'https://www.pre-onboarding-selection-task.shop';

const paths = {
  todos: '/todos',
  signin: '/auth/signin',
  signup: '/auth/signup',
};

const getTodos = () => {
  return rest.get(`${baseUrl}${paths.todos}`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(sampleTodos));
  });
};

export const handlers = [getTodos()];
