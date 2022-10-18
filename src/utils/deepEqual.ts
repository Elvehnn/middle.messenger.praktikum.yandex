import { isObject } from './isObject';

function deepEqual(a: Indexed, b: Indexed): boolean {
  if (a === b) {
    return true;
  }

  if (a === null || b === null || !isObject(a) || !isObject(b)) {
    return false;
  }

  const aObjectKeys = Object.keys(a);
  const bObjectKeys = Object.keys(b);

  if (aObjectKeys.length !== bObjectKeys.length) {
    return false;
  }

  return aObjectKeys.reduce((acc: boolean, key) => {
    if (!bObjectKeys.includes(key)) {
      acc = false;
      return acc;
    }
    acc = deepEqual(a[key] as Indexed, b[key] as Indexed);
    return acc;
  }, true);
}

export default deepEqual;

// const a = {a: 1};
// const b = {a: 1};
// deepEqual(a, b);
