export const reduceObjectToString = (iterableObject: Array<unknown>, key: string) => {
  return iterableObject.reduce((acc: string, current: unknown) => {
    acc += `${(current as Record<string, any>)[key]}, `;
    return acc;
  }, '');
};
