import { lowerCaseFirstLetter } from 'utils/lowerCaseFirstLetter';
import { stringToPascalCase } from 'utils/stringToPascalCase';

export const stringToCamelCase = (inputString: string): string => {
  return lowerCaseFirstLetter(stringToPascalCase(inputString));
};
