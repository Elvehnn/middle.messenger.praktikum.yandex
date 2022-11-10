import { ROUTS } from '../constants/routes';
import renderDOM from 'core/RenderDOM';
import Router from 'core/Router';
import SigninPage from 'pages/signin/signin';
import { Store } from 'store/Store';

import { startApp } from './startApp';

export const initRouter = async (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      const isAuthorized = !!store.getState().user;

      if (!isAuthorized && route.isPrivate) {
        router.go('/signin');
        return;
      }

      if (isAuthorized && !route.isPrivate) {
        router.go('/main');
        return;
      }

      if (isAuthorized || !route.isPrivate) {
        store.setState({ view: route.view, currentRoutePathname: route.pathname });
        return;
      }

      if (!store.getState().view) {
        store.setState({ view: SigninPage, currentRoutePathname: '/signin' });
      }
    });
  });

  store.on('updated', (prevState, nextState) => {
    if (!prevState.isAppStarted && nextState.isAppStarted) {
      router.start();
    }

    if (prevState.currentRoutePathname !== nextState.currentRoutePathname) {
      const Page = nextState.view;
      const newPage = new Page({});

      renderDOM(newPage);
      document.title = `App / ${Page.componentName}`;

      return;
    }
  });

  // router.go(window.location.pathname);
};
