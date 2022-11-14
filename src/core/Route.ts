import { isStringEqual } from 'utils/checkers and validators/isStringEqual';
import Block from './Block';

export default class Route {
  pathname: string;

  view: Block<{}>;

  isPrivate: boolean;

  callback: () => void;

  constructor(props: RouteProps) {
    const { pathname, view, isPrivate, callback } = props;
    this.pathname = pathname;
    this.view = view;
    this.isPrivate = isPrivate;
    this.callback = callback;
  }

  match(pathname: string): boolean {
    return isStringEqual(pathname, this.pathname);
  }
}
