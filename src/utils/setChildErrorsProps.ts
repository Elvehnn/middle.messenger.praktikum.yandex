export const setChildErrorsProps = (errors: Record<string, string>, parentRefs: ParentRefs) => {
  if (Object.entries(errors).length !== 0) {
    Object.entries(errors).forEach(([key, value]) => {
      const childRefs = parentRefs[key].getRefs();

      if (Object.keys(childRefs).includes('errorRef')) {
        childRefs.errorRef.setProps({
          error: value,
        });
      }
    });

    return;
  }

  Object.values(parentRefs).forEach((value) => {
    value.getRefs().errorRef.setProps({ error: '' });
  });
};
