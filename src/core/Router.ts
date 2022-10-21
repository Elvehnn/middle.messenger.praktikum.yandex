import Route, { RouteProps } from './Route';

interface RouterProps {
  routes: Array<Route>;
}

export default class Router implements RouterProps {
  private _currentRoute: Nullable<Route> = null;
  routes: Array<Route> = [];
  static __instance: Router;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(props: RouteProps, callback: () => void) {
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
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    route.callback();
  }

  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this._onRouteChange(pathname);
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
