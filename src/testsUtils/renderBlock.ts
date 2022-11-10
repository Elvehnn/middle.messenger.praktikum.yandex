import { BlockClass } from 'core/Block';
import { renderDOM, registerComponent } from 'core';
import { defaultState } from 'store/defaultState';
import { initRouter } from 'services/initRouter';
import * as components from 'components';
import { Store } from 'store/Store';
import { BlockConstructable } from 'core/RegisterComponent';
import { sleep } from '../utils/sleep';
import MockedRouter from './MockedRouter';

type RenderBlockParams<T extends Record<string, unknown>> = {
  Block: BlockClass<T>;
  props: T;
  state?: Partial<AppState>;
};

export async function renderBlock<T extends Record<string, unknown>>({
  Block,
  props,
  state = defaultState,
}: RenderBlockParams<T>) {
  Object.values(components).forEach((Component: unknown) => {
    registerComponent(Component as BlockConstructable);
  });

  const store = new Store<AppState>({ ...defaultState, ...state });
  window.store = store;

  const router = new MockedRouter();
  window.router = router;

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM(new Block(props));

  initRouter(router, store);

  await sleep();
}
