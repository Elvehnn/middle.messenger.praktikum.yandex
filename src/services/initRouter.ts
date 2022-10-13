import { ROUTS } from 'constants/routes';
import Router from 'core/Router';

export const initRouter = (router: Router) => {
  ROUTS.forEach((route) => {
    router.use(route.pathname, route.view);
  });
};
