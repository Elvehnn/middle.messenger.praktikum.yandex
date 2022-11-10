import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import '@testing-library/dom';
import '@testing-library/user-event';
import { server } from './mockAPI';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
