export const isObject = (valueToCheck: unknown) => {
  return String(valueToCheck) === '[object Object]';
};
