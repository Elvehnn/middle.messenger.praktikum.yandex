import { ONE_CAPITAL_LETTER } from '../constants/validateRegExpressions';

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
          errors[type] = 'Login must contain from 3 to 20 letters';
          return;
        }

        break;

      case ValidateType.Password:
        if (!value.length) {
          errors[type] = 'Password can not be empty';
          return;
        }

        if (value.length > 40 || value.length < 8) {
          errors[type] = 'Password must contain from 8 to 40 letters';
          return;
        }

        if (!value.match(ONE_CAPITAL_LETTER)) {
          errors[type] = 'Password must contain one capital letter at least';
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
