import deepMerge from './deepMerge';
import getObjectFromPath from './getObjectFromPath';
import { isObject } from './checkers and validators/isObject';

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be a string');
  }

  if (!isObject(object)) return object;

  const rhs = getObjectFromPath(path.split('.'), value);

  return deepMerge(object as Indexed, rhs);
}

export default set;
