import Router from 'core/Router';
import MockPage from '../tests/MockPage';
import store, { Store } from 'store/Store';
import { default as Profile } from 'pages/profile/profile';
import { sleep } from 'utils/sleep';
import { initRouter } from 'services/initRouter';
import { defaultState } from 'store/defaultState';
import { renderBlock } from '../tests/renderBlock';

describe('core/Router', () => {
  let router: Router;
  let store: Store<AppState>;

  beforeEach(() => {
    store = new Store<AppState>(defaultState);
    window.store = store;
    router = new Router();
    window.router = router;

    initRouter(router, store);
  });

  it('should register routes', () => {
    const callbackFn = () => {};
    router.use({ pathname: '/test', view: MockPage, isPrivate: false }, callbackFn);

    expect(router.routes).toContainEqual({
      pathname: '/test',
      view: MockPage,
      isPrivate: false,
      callback: callbackFn,
    });
  });

  it('should navigate to a path', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const callbackFn = () => {};

    router.use({ pathname: '/test', view: MockPage, isPrivate: false }, callbackFn);
    router.go('/test');

    expect(store.getState().currentRoutePathname).toBe('/test');
  });

  it('should navigate back', async () => {
    document.body.innerHTML = '<div id="app"></div>';
    const callbackFn = () => {};

    router.use({ pathname: '/test', view: MockPage, isPrivate: false }, callbackFn);
    router.go('/test');
    router.go('/anypath');
    router.back();

    await sleep();

    expect(window.location.pathname).toBe('/test');
  });
});
