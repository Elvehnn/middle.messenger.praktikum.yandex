import Router from 'core/Router';
import { Store } from 'store/Store';
import { sleep } from 'utils/sleep';
import { initRouter } from 'services/initRouter';
import { defaultState } from 'store/defaultState';
import MockPage from '../testsUtils/MockPage';

describe('core/Router', () => {
  let router: Router;
  let store: Store<AppState>;
  const callbackFn = () => true;

  beforeEach(() => {
    store = new Store<AppState>(defaultState);
    window.store = store;
    router = new Router();
    window.router = router;

    initRouter(router, store);
  });

  it('should register routes', () => {
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

    router.use({ pathname: '/test', view: MockPage, isPrivate: false }, callbackFn);
    router.go('/test');

    expect(store.getState().currentRoutePathname).toBe('/test');
  });

  it('should navigate back', async () => {
    document.body.innerHTML = '<div id="app"></div>';

    router.use({ pathname: '/test', view: MockPage, isPrivate: false }, callbackFn);
    router.go('/test');
    router.go('/anypath');
    router.back();

    await sleep();

    expect(window.location.pathname).toBe('/test');
  });
});
