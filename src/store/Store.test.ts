import { defaultState } from './defaultState';
import { Store } from './Store';

describe('Store', () => {
  let store: Store<AppState>;

  beforeEach(() => {
    store = new Store(defaultState);
  });

  it('should start with defaultState', () => {
    expect(store.getState()).toEqual(defaultState);
  });

  it('should set full state', () => {
    const newState: AppState = {
      isLoading: false,
      view: null,
      errorMessage: 'Error',
      user: null,
      isAppStarted: false,
      chats: [],
      selectedChat: null,
      isPopupShown: false,
    };

    store.setState(newState);

    expect(store.getState()).toEqual(newState);
  });

  it('should set partial state', () => {
    store.setState({ isLoading: true });

    expect(store.getState().isLoading).toBe(true);
  });

  it('should emit update event if store was changed', () => {
    const mock = jest.fn();
    const nextState = { ...defaultState, errorMessage: 'User not found' };

    store.on('updated', mock);
    store.setState({ errorMessage: 'User not found' });

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(defaultState, nextState);
  });

  it('should not emit update event if next state did not changed the store', () => {
    const mock = jest.fn();
    const nextState = { ...defaultState, errorMessage: '' };

    store.on('updated', mock);
    store.setState({ errorMessage: '' });

    expect(mock).toHaveBeenCalledTimes(0);
  });
});
