import { ROUTS } from 'constants/routes';
import renderDOM from 'core/RenderDOM';
import Router from 'core/Router';
import { StartPage } from 'pages/start/start';
import { Store } from 'store/Store';

export const initRouter = (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      console.log(route);
      store.dispatch({ view: route.view });

      if (!store.getState().view) {
        store.dispatch({ view: StartPage });

        return;
      }
    });
  });

  store.on('updated', (prevState, nextState) => {
    if (!prevState.isAppStarted && nextState.isAppStarted) {
      router.start();
    }

    if (prevState.view !== nextState.view) {
      const Page = nextState.view;
      const newPage = new Page({});
      console.log(newPage);

      renderDOM(newPage);
      document.title = `App / ${Page.componentName}`;
    }
  });
};
