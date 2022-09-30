import {
  ALL_DIGITS,
  LATIN_LETTERS,
  ONE_CAPITAL_LETTER,
  ONE_DIGIT,
  ONE_SPACE_SYMBOL,
  SPECIAL_CHARACTERS,
} from '../constants/validateRegExpressions';

export enum ValidateType {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  Phone = 'phone',
}

export type ValidateRule = {
  type: ValidateType;
  value: string;
};

export const validateForm = (rulesArray: ValidateRule[]) => {
  let errors: { [key: string]: string } = {};

  rulesArray.forEach((rule) => {
    const { type, value } = rule;

    switch (type) {
      case ValidateType.Login:
        if (!value.length) {
          errors[type] = 'Login can not be empty';
          return;
        }

        if (value.length > 20 || value.length < 3) {
          errors[type] = 'Login must contain from 3 to 20 symbols';
          return;
        }

        if (value.match(ALL_DIGITS)) {
          errors[type] = 'Login should use at least one letter';
          return;
        }

        if (!value.match(LATIN_LETTERS)) {
          errors[type] = 'Login should use only latin letters';
          return;
        }

        if (!value.match(ONE_SPACE_SYMBOL)) {
          errors[type] = 'Login should not contain space symbols';
          return;
        }

        if (value.match(SPECIAL_CHARACTERS)) {
          errors[type] = 'Login should not contain special symbols';
          return;
        }

        break;

      case ValidateType.Password:
        if (!value.length) {
          errors[type] = 'Password can not be empty';
          return;
        }

        if (value.length > 40 || value.length < 8) {
          errors[type] = 'Password must contain from 8 to 40 symbols';
          return;
        }

        if (!value.match(ONE_CAPITAL_LETTER)) {
          errors[type] = 'Password must contain one capital letter at least';
          return;
        }

        if (!value.match(ONE_DIGIT)) {
          errors[type] = 'Password must contain one digit at least';
          return;
        }

        break;

      case ValidateType.Email:
        console.log('Перебор');
        break;
      case ValidateType.Phone:
        console.log('Перебор');
        break;
      default:
        console.log('Нет таких значений');
    }
  });

  return errors;
};
