import { isObject } from './checkers and validators/isObject';

function deepMerge(lhs: Indexed, rhs: Indexed): Indexed {
  const target: Indexed = lhs || {};

  Object.entries(rhs).forEach(([key, value]) => {
    if (isObject(value) && target[key] && isObject(target[key])) {
      target[key] = deepMerge(target[key] as Indexed, value as Indexed);
    } else {
      target[key] = value;
    }
  });

  return target;
}

export default deepMerge;
