import { getByTestId, getAllByText, prettyDOM, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { Store } from 'store/Store';
import { defaultState } from 'store/defaultState';
import { renderBlock } from 'utils/renderBlock';
import { default as Profile } from './profile';
import { sleep } from 'utils/sleep';

describe('pages/profile', () => {
  let store: Store<AppState>;

  beforeEach(() => {
    store = new Store(defaultState);
  });

  it('should render profile page with default props', () => {
    renderBlock({
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
    const userMOCK = {
      avatar: 'blob:http://localhost:1234/784663d0-0878-419e-b4ca-3d747d5f39cc',
      displayName: 'N',
      email: 'Elvehnn1980@gmail.com',
      firstName: 'Elena',
      id: 44866,
      login: 'Elvehnn1980',
      phone: '+7(960)900-00-00',
      secondName: 'Pupkina',
    };

    renderBlock({
      Block: Profile,
      props: {},
      state: {
        view: Profile,
        isAppStarted: true,
        user: userMOCK,
      },
    });

    // console.log(prettyDOM(document.body));

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
});
