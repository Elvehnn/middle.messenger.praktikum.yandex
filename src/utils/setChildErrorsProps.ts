import Block from 'core/Block';

export const setChildErrorsProps = (
  errors: Record<string, string>,
  parentRefs: Record<string, Block<any, {}>>
) => {
  if (Object.entries(errors).length !== 0) {
    Object.entries(errors).forEach(([key, value]) =>
      // @ts-expect-error Тип {} не соответствует типу Record<string, Block<any>
      parentRefs[key].getRefs().errorRef.setProps({ error: value })
    );

    return;
  }

  Object.values(parentRefs).forEach((value) => {
    // @ts-expect-error Тип {} не соответствует типу Record<string, Block<any>
    value.getRefs().errorRef.setProps({ error: '' });
  });
};
