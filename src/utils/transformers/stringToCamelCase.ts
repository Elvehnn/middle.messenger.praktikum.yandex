import { lowerCaseFirstLetter } from './lowerCaseFirstLetter';
import { stringToPascalCase } from './stringToPascalCase';

export const stringToCamelCase = (inputString: string): string => {
  return lowerCaseFirstLetter(stringToPascalCase(inputString));
};
