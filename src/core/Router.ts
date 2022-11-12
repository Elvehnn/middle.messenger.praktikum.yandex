import renderDOM from './RenderDOM';
import Route from './Route';

export default class Router implements IRouter {
  routes: Array<Route> = [];

  static __instance: IRouter;

  constructor() {
    Router.__instance = this;
    window.onpopstate = () => {
      this.onRouteChange.call(this);
    };
  }

  use(props: PartialRouteProps, callback: () => void) {
    const routeProps = { ...props, callback } as RouteProps;
    const route = new Route(routeProps);

    this.routes.push(route);

    return this;
  }

  onRouteChange(pathname: string = window.location.pathname) {
    const route = this.getRoute(pathname) || this.getRoute('/404');

    window.store.setState({ view: route?.view, currentRoutePathname: route?.pathname });

    route?.callback();
  }

  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this.onRouteChange(pathname);
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
