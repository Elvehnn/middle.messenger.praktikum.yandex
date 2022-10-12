import { isStringEqual } from 'utils/isStringEqual';
import Block from './Block';
import { AnyProps, BlockConstructable } from './RegisterComponent';
import { renderBlock } from './renderBlock';

interface RouteProps {
  pathname: string;
  view: BlockConstructable;
  viewProps: AnyProps;
  props: { rootQuery: string };
}

export default class Route {
  private _pathname: string;
  private _blockClass: BlockConstructable;
  private _props: { rootQuery: string };
  private _block: Nullable<Block<AnyProps>>;
  _viewProps: AnyProps;

  constructor({ pathname, view, viewProps, props }: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._viewProps = viewProps;
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
      renderBlock(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
