import { isObject } from './checkers and validators/isObject';

type ArrayOrObject = Record<number | string, unknown>;

export const cloneDeep = (obj: object) => {
  const clone = (Array.isArray(obj) ? [] : {}) as ArrayOrObject;

  Object.entries(obj).forEach(([key, value]) => {
    if (isObject(value)) {
      clone[key] = cloneDeep(value as object);
    } else {
      clone[key] = value;
    }
  });

  return clone as Record<string, unknown>;
};
