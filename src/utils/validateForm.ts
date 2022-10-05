import {
  ALL_DIGITS,
  EMAIL_CHARACTERS,
  FIRST_CAPITAL_LETTER,
  LATIN_LETTERS,
  NO_DIGITS,
  ONE_CAPITAL_LETTER,
  ONE_DIGIT,
  ONE_SPACE_SYMBOL,
  ONLY_LETTERS_AND_DASH,
  PHONE_SYMBOLS,
  SPECIAL_CHARACTERS,
} from '../constants/validateRegExpressions';

export enum ValidateType {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  Phone = 'phone',
  FirstName = 'first_name',
  SecondName = 'second_name',
  Attach = 'attach',
  Message = 'message',
  File = 'file',
}

export type ValidateRule = {
  type: ValidateType;
  value: string;
};

export const validateForm = (rulesArray: ValidateRule[]) => {
  const errors: { [key: string]: string } = {};

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
        if (!value.length) {
          errors[type] = 'Email can not be empty';
          return;
        }

        if (!value.match(EMAIL_CHARACTERS)) {
          errors[type] = 'Invalid e-mail address';
          return;
        }

        break;

      case ValidateType.Phone:
        if (!value.length) {
          errors[type] = 'Phone can not be empty';
          return;
        }

        if (!value.match(NO_DIGITS)) {
          errors[type] = 'Phone number must not contain letters';
          return;
        }

        if (!value.match(PHONE_SYMBOLS)) {
          errors[type] = 'Invalid phone number';
          return;
        }

        break;

      case ValidateType.FirstName:
        if (!value.length) {
          errors[type] = 'Name can not be empty';
          return;
        }

        if (!value.match(ONLY_LETTERS_AND_DASH)) {
          errors[type] = 'Name must contain only letters and dash';
          return;
        }

        if (!value.match(FIRST_CAPITAL_LETTER)) {
          errors[type] = 'Name should begin with a capital letter';
          return;
        }

        break;

      case ValidateType.SecondName:
        if (!value.length) {
          errors[type] = 'Name can not be empty';
          return;
        }

        if (!value.match(ONLY_LETTERS_AND_DASH)) {
          errors[type] = 'Name must contain only letters and dash';
          return;
        }

        if (!value.match(FIRST_CAPITAL_LETTER)) {
          errors[type] = 'Name should begin with a capital letter';
          return;
        }

        break;

      case ValidateType.Message:
        if (!value.length) {
          errors[type] = 'Your message is empty';
          return;
        }

        break;

      default:
        errors[type] = 'Unknown error';
    }
  });

  return errors;
};
