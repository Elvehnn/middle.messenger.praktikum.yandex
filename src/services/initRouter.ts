import { ROUTS } from 'constants/routes';
import renderDOM from 'core/RenderDOM';
import Router from 'core/Router';
import SigninPage from 'pages/signin/signin';
import { Store } from 'store/Store';

export const initRouter = (router: Router, store: Store<AppState>) => {
  ROUTS.forEach((route) => {
    router.use(route, () => {
      console.log(route);

      if (!store.getState().view) {
        const lastView = localStorage.getItem('lastView');
        const view = ROUTS.find((route) => route.pathname === lastView)?.view;
        console.log(store.getState().view);

        const newView = view || SigninPage;
        store.setState({ view: newView });

        return;
      }

      store.setState({ view: route.view });
      localStorage.setItem('lastView', route.pathname || '/');
    });
  });

  store.on('updated', (prevState, nextState) => {
    if (!prevState.isAppStarted && nextState.isAppStarted) {
      router.start();
    }

    if (prevState.view !== nextState.view) {
      console.log(prevState.view, nextState.view);
      const Page = nextState.view;
      const newPage = new Page({});

      renderDOM(newPage);
      document.title = `App / ${Page.componentName}`;
    }
  });
};
