import { isStringEqual } from 'utils/checkers and validators/isStringEqual';
import { BlockConstructable } from './RegisterComponent';

export interface RouteProps {
  pathname: string;
  view: BlockConstructable;
  isPrivate: boolean;
  callback: Function;
}

export default class Route implements RouteProps {
  pathname: string;
  view: BlockConstructable;
  isPrivate: boolean;
  callback: Function;

  constructor({ pathname, view, isPrivate, callback }: RouteProps) {
    this.pathname = pathname;
    this.view = view;
    this.isPrivate = isPrivate;
    this.callback = callback;
  }

  match(pathname: string): boolean {
    return isStringEqual(pathname, this.pathname);
  }
}
