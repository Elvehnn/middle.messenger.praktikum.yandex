import renderDOM from 'core/RenderDOM';
import Router from 'core/Router';
import { Store } from 'store/Store';
import { ROUTS } from '../constants/routes';

export const initRouter = async (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      const isAuthorized = !!store.getState().user;

      if (isAuthorized) {
        if (route.isPrivate) {
          store.setState({ view: route.view, currentRoutePathname: route.pathname });
        } else {
          router.go('/main');
        }

        return;
      }

      if ((!route.isPrivate && route.pathname === '/') || route.isPrivate) {
        router.go('/signin');
        return;
      }

      store.setState({ view: route.view, currentRoutePathname: route.pathname });
    });
  });

  store.on('updated', (prevState, nextState) => {
    if (prevState.currentRoutePathname !== nextState.currentRoutePathname) {
      const Page = nextState.view;
      const newPage = new Page({});

      renderDOM(newPage);
      document.title = `App / ${Page.componentName}`;
    }
  });
};
