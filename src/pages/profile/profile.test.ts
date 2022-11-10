import {
  getByTestId,
  getAllByText,
  prettyDOM,
  getByText,
  waitFor,
  queryByTestId,
} from '@testing-library/dom';
import '@testing-library/jest-dom';
import { renderBlock } from '../../tests/renderBlock';
import { default as Profile } from './profile';
import { sleep } from 'utils/sleep';
import { USER_MOCK } from '../../tests/userMock';

describe('pages/profile', () => {
  it('should render profile page with default props', async () => {
    await renderBlock({
      Block: Profile,
      props: {},
    });

    expect(getByTestId(document.body, 'profile')).toBeInTheDocument();
    expect(getByTestId(document.body, 'aside')).toBeInTheDocument();
    expect(getByTestId(document.body, 'profile-container')).toBeInTheDocument();
    expect(getByTestId(document.body, 'user')).toBeInTheDocument();
    expect(getByTestId(document.body, 'user-data')).toBeInTheDocument();
    expect(getByTestId(document.body, 'change-user-data-btn')).toBeInTheDocument();
    expect(getByTestId(document.body, 'change-user-password-btn')).toBeInTheDocument();
    expect(getByTestId(document.body, 'signout-btn')).toBeInTheDocument();
  });

  it('should render profile page with store data', async () => {
    await renderBlock({
      Block: Profile,
      props: {},
      state: {
        view: Profile,
        currentRoutePathname: '/profile',
        isAppStarted: true,
        user: USER_MOCK,
      },
    });

    expect(getByTestId(document.body, 'profile')).toBeInTheDocument();
    expect(getByTestId(document.body, 'aside')).toBeInTheDocument();
    expect(getByTestId(document.body, 'profile-container')).toBeInTheDocument();
    expect(getByTestId(document.body, 'user')).toBeInTheDocument();
    expect(getByTestId(document.body, 'user-data')).toBeInTheDocument();
    expect(getByTestId(document.body, 'change-user-data-btn')).toBeInTheDocument();
    expect(getByTestId(document.body, 'change-user-password-btn')).toBeInTheDocument();
    expect(getByTestId(document.body, 'signout-btn')).toBeInTheDocument();
    expect(getAllByText(document.body, 'Elvehnn1980')).toHaveLength(2);
    expect(getByText(document.body, 'Elvehnn1980@gmail.com')).toBeInTheDocument();
    expect(getByText(document.body, '+7(960)900-00-00')).toBeInTheDocument();
    expect(getByText(document.body, 'Elena')).toBeInTheDocument();
    expect(getByText(document.body, 'Pupkina')).toBeInTheDocument();
  });

  it('should logout from profile and redirect to signin', async () => {
    await renderBlock({
      Block: Profile,
      props: {},
      state: {
        view: Profile,
        currentRoutePathname: '/profile',
        isAppStarted: true,
        user: USER_MOCK,
      },
    });

    await (async () => {
      const signoutButton = getByTestId(document.body, 'signout-btn');
      signoutButton.click();
    })();

    await (async () => {
      await waitFor(() => expect(getByTestId(document.body, 'signin')).toBeInTheDocument());
    })();

    const state = window.store.getState();

    expect(state.view.componentName).toBe('SigninPage');
    expect(state.currentRoutePathname).toBe('/signin');
    expect(state.user).toEqual(null);
  });
});
