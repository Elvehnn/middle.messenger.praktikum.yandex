/* eslint-disable import/no-extraneous-dependencies */
import userEvent from '@testing-library/user-event';
import { findByTestId, getByTestId, waitFor } from '@testing-library/dom';
import { sleep } from 'utils/sleep';
import SigninPage from './signin';
import { renderBlock } from '../../tests/renderBlock';

describe('pages/signin', () => {
  it('should log a user in', async () => {
    await renderBlock({
      Block: SigninPage,
      props: {},
    });

    await userEvent.type(getByTestId(document.body, 'Login'), 'Elvehnn1980');
    await userEvent.type(getByTestId(document.body, 'Password'), 'Elvehnn1980');

    await (async () => {
      const loginButton = getByTestId(document.body, 'login-btn');
      loginButton.click();
    })();

    await sleep();

    await (async () => {
      waitFor(() => expect(findByTestId(document.body, 'main')).toBeInTheDocument());
    })();

    await (async () => {
      const state = window.store.getState();

      expect(state.view.componentName).toBe('MainPage');
      expect(state.currentRoutePathname).toBe('/main');
      expect(state.user?.login).toBe('Elvehnn1980');
      expect(state.user?.id).toBe(44866);
    })();
  });

  it('should render signin page with default props', async () => {
    await renderBlock({
      Block: SigninPage,
      props: {},
    });

    expect(getByTestId(document.body, 'signin')).toBeInTheDocument();
    expect(getByTestId(document.body, 'form-submit-warning')).toBeInTheDocument();
    expect(getByTestId(document.body, 'login-btn')).toBeInTheDocument();
    expect(getByTestId(document.body, 'goto-signup-btn')).toBeInTheDocument();
  });
});
