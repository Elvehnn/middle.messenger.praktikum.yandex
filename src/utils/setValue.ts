import deepMerge from './deepMerge';
import getObjectFromPath from './getObjectFromPath';
import { isObject } from './isObject';

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be a string');
  }

  if (!isObject(object)) return object;

  const rhs = getObjectFromPath(path.split('.'), value);

  return deepMerge(object as Indexed, rhs);
}

export default set;

//Praktikum solution

// function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
//   if (typeof object !== 'object' || object === null) {
//       return object;
//   }

//   if (typeof path !== 'string') {
//       throw new Error('path must be string');
//   }

//   const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
//       [key]: acc,
//   }), value as any);
//   return merge(object as Indexed, result);
// }
