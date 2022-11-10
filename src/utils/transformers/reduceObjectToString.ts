export const reduceObjectToString = (iterableObject: Array<unknown>, key: string) => {
  return iterableObject.reduce((acc: string, current: unknown) => {
    return `${acc}${(current as Record<string, unknown>)[key]}, `;
  }, '');
};
