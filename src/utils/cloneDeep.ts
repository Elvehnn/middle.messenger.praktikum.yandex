import { isObject } from './checkers and validators/isObject';

export const cloneDeep = <T extends object = object>(obj: T) => {
  const clone = (Array.isArray(obj) ? [] : {}) as T;

  for (let i in obj) {
    if (isObject(obj[i])) {
      clone[i] = cloneDeep(obj[i] as T) as T[Extract<keyof T, string>];
    } else {
      clone[i] = obj[i];
    }
  }
  return clone;
};
