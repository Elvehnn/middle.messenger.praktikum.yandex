import { BlockConstructable } from './RegisterComponent';
import Route from './Route';

interface RouterProps {
  routes: Array<Route>;
  history: History;
}

export default class Router implements RouterProps {
  private _currentRoute: Nullable<Route> = null;

  routes: Array<Route> = [];
  history: any;

  static __instance: Router;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.history = window.history;

    Router.__instance = this;
  }

  use(pathname: string, view: BlockConstructable) {
    const route = new Route({ pathname, view });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRouteChange(window.location.pathname);
    };

    window.addEventListener('hashchange', () => this._onRouteChange(window.location.pathname));

    this._onRouteChange(window.location.pathname);
  }

  _onRouteChange(pathname: string) {
    const route = this.getRoute(pathname);
    console.log(route, pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(route);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRouteChange(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
