export const getChildInputRefs = (parentRefs: ParentRefs) => {
  return Object.entries(parentRefs).reduce((acc, [key, value]) => {
    acc[key] = value.getRefs()[key].getContent() as HTMLInputElement;
    return acc;
  }, {} as RefsObject);
};
