import { isStringEqual } from 'utils/isStringEqual';
import Block from './Block';
import { AnyProps, BlockConstructable } from './RegisterComponent';
import renderDOM from './RenderDOM';

export interface RouteProps {
  pathname: string;
  view: BlockConstructable;
}

export default class Route {
  private _pathname: string;
  private _blockClass: BlockConstructable;
  private _block: Nullable<Block<AnyProps>>;

  constructor({ pathname, view }: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
  }

  navigate(pathname: string, viewProps: AnyProps) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render(viewProps);
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isStringEqual(pathname, this._pathname);
  }

  render(viewProps: AnyProps) {
    if (!this._block) {
      this._block = new this._blockClass(viewProps);
      renderDOM(this._block);
      return;
    }

    this._block.show();
  }
}
