import Block from 'core/Block';

export const setChildErrorsProps = (
  errors: Record<string, string>,
  parentRefs: Record<string, Block<any, any>>
) => {
  if (Object.entries(errors).length !== 0) {
    Object.entries(errors).forEach(([key, value]) =>
      parentRefs[key].getRefs().errorRef.setProps({ error: value })
    );

    return;
  }

  Object.values(parentRefs).forEach((value) => {
    value.getRefs().errorRef.setProps({ error: '' });
  });
};
