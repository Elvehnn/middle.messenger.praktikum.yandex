import { ROUTS } from 'constants/routes';
import renderDOM from 'core/RenderDOM';
import Router from 'core/Router';
import SigninPage from 'pages/signin/signin';
import { Store } from 'store/Store';

export const initRouter = (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      const isAuthorized = store.getState().user;
      console.log(isAuthorized, route.isPrivate);

      if (isAuthorized || !route.isPrivate) {
        store.setState({ view: route.view });
        return;
      }

      if (!store.getState().view) {
        store.setState({ view: SigninPage });
      }
    });
  });

  store.on('updated', (prevState, nextState) => {
    if (!prevState.isAppStarted && nextState.isAppStarted) {
      console.log('start');
      router.start();
    }

    if (prevState.view !== nextState.view) {
      console.log(prevState.view, nextState.view);
      const Page = nextState.view;
      const newPage = new Page({});

      renderDOM(newPage);
      document.title = `App / ${Page.componentName}`;

      return;
    }
  });
};
