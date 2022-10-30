function deepEqual(a: Indexed, b: Indexed): boolean {
  if (a === b) {
    return true;
  }

  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') {
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

//Praktikum solution:
// type PlainObject<T = any> = {
//   [k in string]: T;
// };

// function isPlainObject(value: unknown): value is PlainObject {
//   return typeof value === 'object'
//       && value !== null
//       && value.constructor === Object
//       && Object.prototype.toString.call(value) === '[object Object]';
// }

// function isArray(value: unknown): value is [] {
//   return Array.isArray(value);
// }

// function isArrayOrObject(value: unknown): value is [] | PlainObject {
//   return isPlainObject(value) || isArray(value);
// }

// function isEqual(lhs: PlainObject, rhs: PlainObject) {
//   if (Object.keys(lhs).length !== Object.keys(rhs).length) {
//       return false;
//   }

//   for (const [key, value] of Object.entries(lhs)) {
//       const rightValue = rhs[key];
//       if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
//           if (isEqual(value, rightValue)) {
//               continue;
//           }
//           return false;
//       }

//       if (value !== rightValue) {
//           return false;
//       }
//   }

//   return true;
// }
