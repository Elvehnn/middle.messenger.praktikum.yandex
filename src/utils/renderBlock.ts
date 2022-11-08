import { BlockClass } from 'core/Block';
import { renderDOM, registerComponent } from 'core';
import { defaultState } from 'store/defaultState';
import { initRouter } from 'services/initRouter';
import * as components from 'components';
import { Store } from 'store/Store';
import { sleep } from './sleep';
import { AnyProps } from 'core/RegisterComponent';

type RenderBlockParams<T extends Record<string, any>> = {
  Block: BlockClass<T>;
  props: T;
  state?: Partial<AppState>;
};

export async function renderBlock<T extends Record<string, any>>({
  Block,
  props,
  state = defaultState,
}: RenderBlockParams<T>) {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
  });

  const store = new Store<AppState>({ ...defaultState, ...state });

  window.store = store;

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM(new Block(props));

  await sleep();
}
