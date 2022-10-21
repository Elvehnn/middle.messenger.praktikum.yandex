import { ROUTS } from 'constants/routes';
import renderDOM from 'core/RenderDOM';
import Router from 'core/Router';
import { StartPage } from 'pages/start/start';
import { Store } from 'store/Store';

export const initRouter = (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      if (!store.getState().view) {
        store.dispatch({ view: StartPage });
      }

      store.dispatch({ view: route.view });
    });
  });

  router.start();

  store.on('updated', (prevState, nextState) => {
    if (prevState.view !== nextState.view) {
      const Page = nextState.view;

      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
};
