import { BlockClass } from 'core/Block';
import { renderDOM, registerComponent } from 'core';
import { defaultState } from 'store/defaultState';
import { initRouter } from 'services/initRouter';
import * as components from 'components';
import { Store } from 'store/Store';
import { sleep } from './sleep';

type RenderBlockParams<T> = {
  Block: BlockClass<Indexed<T>>;
  props: T;
  state?: Partial<AppState>;
};

export async function renderBlock<T extends Indexed<T>>({
  Block,
  props,
  state = defaultState,
}: RenderBlockParams<T>) {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
  });

  const store = new Store<AppState>({ ...defaultState, ...state });
  //   const router = new MockedHashRouter();

  //   window.router = router;
  window.store = store;

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM(new Block(props as T));

  //   initRouter(router, store);

  /**
   * Ждем вызова componentDidMount,
   * медота жизненного цикла компонента,
   * который вызывается через 100мс в Block.getContent
   */
  await sleep();
}

export async function step(name: string, callback: () => void) {
  await callback();
}
