import Router from 'core/Router';

export default class MockedRouter extends Router {
  go(pathname: string) {
    console.log('go to ', pathname);
    window.location.pathname = pathname;
    this.onRouteChange(pathname);
  }
}
