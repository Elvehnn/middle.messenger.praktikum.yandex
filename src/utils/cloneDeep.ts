/* eslint-disable @typescript-eslint/no-explicit-any */
import { isObject } from './checkers and validators/isObject';

export const cloneDeep = (obj: object) => {
  const clone: any = Array.isArray(obj) ? [] : {};

  Object.entries(obj).forEach(([key, value]) => {
    if (isObject(value)) {
      clone[key] = cloneDeep(value as object);
    } else {
      clone[key] = value;
    }
  });

  return clone;
};
