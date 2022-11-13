import { registerComponent } from 'core';
import * as components from 'components';
import './styles/style.scss';
import Router from 'core/Router';
import { initRouter } from 'services/initRouter';
import { startApp } from 'services/startApp';
import SocketController from 'core/SocketController';
import { BlockConstructable } from 'core/RegisterComponent';
import store, { Store } from './store/Store';

Object.values(components).forEach((Component: BlockConstructable) => {
  registerComponent(Component);
});

declare global {
  interface Window {
    router: Router;
    store: Store<AppState>;
    socketController: SocketController;
  }
}

const router = new Router();
window.router = router;
window.store = store;

const socketController = new SocketController();
window.socketController = socketController;

// TODO: добавить стартовый экран на запуск приложения

store.on('updated', (nextState) => {
  console.log('%cstore updated', 'background: #222; color: #bada55', nextState);
});

startApp(store).then(() => {
  initRouter(router, store);
  router.go(window.location.pathname);
});
