import { RefsObject } from 'pages/changeUserPassword/changeUserPassword';
import { stringToPascalCase } from './stringToPascalCase';
import { validateForm, ValidateType } from './validateForm';

export const getErrorsObject = (refs: RefsObject) => {
  return Object.entries(refs).reduce((acc, [key, input]) => {
    const nameInPascalCase = stringToPascalCase(key);

    const errorMessage = validateForm([{ name: nameInPascalCase as ValidateType, input: input }])[
      nameInPascalCase
    ];

    if (errorMessage) {
      acc[key] = errorMessage;
    }

    return acc;
  }, {} as Record<string, string>);
};
