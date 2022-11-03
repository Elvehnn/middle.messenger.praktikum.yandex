import { PartialRouteProps } from 'constants/routes';
import renderDOM from './RenderDOM';
import Route from './Route';

interface IRouter {
  routes: Array<Route>;
}

export default class Router implements IRouter {
  routes: Array<Route> = [];
  static __instance: Router;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(props: PartialRouteProps, callback: () => void) {
    const route = new Route({ ...props, callback });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRouteChange.call(this);
    };

    this._onRouteChange();
  }

  private _onRouteChange(pathname: string = window.location.pathname) {
    console.log(pathname);
    let route = this.getRoute(pathname);

    if (!route) {
      route = this.getRoute('/404');
    }

    window.store.setState({ view: route?.view });

    route?.callback();
  }

  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this._onRouteChange(pathname);
  }

  reload() {
    const Page = window.store.getState().view;

    renderDOM(new Page({}));
    document.title = `App / ${Page.componentName}`;
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
