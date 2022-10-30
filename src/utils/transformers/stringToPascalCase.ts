import { capitilizeFirstLetter } from './capitilizeFirstLetter';

export const stringToPascalCase = (inputValue: string) => {
  return inputValue
    .split(/[\s]+/)
    .map((word) => {
      return capitilizeFirstLetter(word).split(/[-]+/).join('');
    })
    .join('');
};
