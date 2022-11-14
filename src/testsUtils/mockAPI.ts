import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { PATH } from '../constants/pathsAPI';
import { USER_MOCK } from './userMock';

const handlers = [
  rest.post(`${PATH.BASE}auth/logout`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${PATH.BASE}auth/signin`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${PATH.BASE}auth/user`, (_req, res, ctx) => {
    return res(ctx.json({ ...USER_MOCK, avatar: '' }));
  }),
  rest.get(`${PATH.BASE}chats`, (_req, res, ctx) => {
    return res(ctx.json([]));
  }),
];

export const server = setupServer(...handlers);
