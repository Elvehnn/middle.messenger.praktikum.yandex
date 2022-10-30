import { isObject } from './checkers and validators/isObject';

function deepMerge(lhs: Indexed, rhs: Indexed): Indexed {
  const target: Indexed = lhs ? lhs : {};

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

//вариант Практикума

// function merge(lhs: Indexed, rhs: Indexed): Indexed {
//     for (let p in rhs) {
//         if (!rhs.hasOwnProperty(p)) {
//             continue;
//         }

//         try {
//             if (rhs[p].constructor === Object) {
//                 rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
//             } else {
//                 lhs[p] = rhs[p];
//             }
//         } catch(e) {
//             lhs[p] = rhs[p];
//         }
//     }

//     return lhs;
// }
