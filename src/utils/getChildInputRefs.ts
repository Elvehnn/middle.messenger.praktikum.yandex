import Block from 'core/Block';
import { RefsObject } from 'pages/changeUserPassword/changeUserPassword';

export const getChildInputRefs = (parentRefs: Record<string, Block<any, {}>>) => {
  return Object.entries(parentRefs).reduce((acc, [key, value]) => {
    // @ts-expect-error Тип {} не соответствует типу Record<string, Block<any>
    acc[key] = value.getRefs()[key].getContent() as HTMLInputElement;
    return acc;
  }, {} as RefsObject);
};
