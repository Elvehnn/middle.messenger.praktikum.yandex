import { isObject } from './isObject';

type StringIndexed = Record<string, any>;

function stringifyPrimitive(key: string, value: number | string | boolean, postfix = '') {
  return postfix ? `${key}[${postfix}]=${value}` : `${key}=${value}`;
}

function stringifyObject(prefix: string, object: object): string {
  if (Array.isArray(object)) {
    const flattenArray = object.map((item, index) => {
      if (typeof item !== 'object') {
        return stringifyPrimitive(prefix, item, String(index));
      }

      return stringifyObject(String(index), item);
    });

    return flattenArray.join('&');
  }

  return Object.entries(object)
    .map(([key, value]) => {
      if (typeof value !== 'object' && value !== null) {
        return stringifyPrimitive(prefix, value, key);
      }

      return stringifyObject(`${prefix}[${key}]`, value);
    })
    .join('&');
}

function queryStringify(data: StringIndexed): string | never {
  if (!isObject(data)) {
    throw new Error('input must be an object');
  }

  const params = Object.entries(data).map(([key, value]) => {
    if (typeof value !== 'object' && value !== null) {
      return stringifyPrimitive(key, value);
    }

    return stringifyObject(key, value);
  });

  return params.join('&');
}

export default queryStringify;

//Praktikum solutional

// type StringIndexed = Record<string, any>;

// const obj: StringIndexed = {
//   key: 1,
//   key2: "test",
//   key3: false,
//   key4: true,
//   key5: [1, 2, 3],
//   key6: { a: 1 },
//   key7: { b: { d: 2 } }
// };

// function queryStringify(data: StringIndexed): string | never {
//   if (typeof data !== "object") {
//     throw new Error("Data must be object");
//   }

//   const keys = Object.keys(data);
//   return keys.reduce((result, key, index) => {
//     const value = data[key];
//     const endLine = index < keys.length - 1 ? "&" : "";

//     if (Array.isArray(value)) {
//       const arrayValue = value.reduce<StringIndexed>(
//         (result, arrData, index) => ({
//           ...result,
//           [`${key}[${index}]`]: arrData
//         }),
//         {}
//       );

//       return `${result}${queryStringify(arrayValue)}${endLine}`;
//     }

//     if (typeof value === "object") {
//       const objValue = Object.keys(value || {}).reduce<StringIndexed>(
//         (result, objKey) => ({
//           ...result,
//           [`${key}[${objKey}]`]: value[objKey]
//         }),
//         {}
//       );

//       return `${result}${queryStringify(objValue)}${endLine}`;
//     }

//     return `${result}${key}=${value}${endLine}`;
//   }, "");
// }

// export default queryStringify
