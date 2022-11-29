import { stringToPascalCase } from './transformers/stringToPascalCase';
import { validateForm, ValidateType } from './checkers and validators/validateForm';

export const getErrorsObject = (refs: RefsObject) => {
  return Object.entries(refs).reduce((acc, [key, input]) => {
    const nameInPascalCase = stringToPascalCase(key);

    const errorMessage = validateForm([
      { name: nameInPascalCase as ValidateType, input: input as HTMLInputElement },
    ])[nameInPascalCase];

    if (errorMessage) {
      acc[key] = errorMessage;
    }

    return acc;
  }, {} as Record<string, string>);
};
