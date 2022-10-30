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
} from '../../constants/validateRegExpressions';
import { lowerCaseFirstLetter } from '../transformers/lowerCaseFirstLetter';

export enum ValidateType {
  Login = 'login',
  Password = 'password',
  Email = 'email',
  Phone = 'phone',
  FirstName = 'firstName',
  SecondName = 'secondName',
  Attach = 'attach',
  Message = 'message',
  File = 'file',
  OldPassword = 'oldPassword',
  NewPassword = 'newPassword',
  RepeatNewPassword = 'repeatNewPassword',
  DisplayName = 'displayName',
  ChatName = 'chatName',
}

export type ValidateRule = {
  name: ValidateType;
  input: HTMLInputElement;
};

export const validateForm = (rulesArray: ValidateRule[]) => {
  const errors: Record<string, string> = {};

  rulesArray.forEach((rule) => {
    const { name, input } = rule;
    const { value } = input;

    switch (lowerCaseFirstLetter(name)) {
      case ValidateType.ChatName:
        if (!value.length) {
          errors[name] = 'Name can not be empty';
          return;
        }
        if (value.length > 20 || value.length < 3) {
          errors[name] = 'Name must contain from 3 to 20 symbols';
          return;
        }
      case ValidateType.Login:
        if (!value.length) {
          errors[name] = 'Login can not be empty';
          return;
        }

        if (value.length > 20 || value.length < 3) {
          errors[name] = 'Login must contain from 3 to 20 symbols';
          return;
        }

        if (value.match(ALL_DIGITS)) {
          errors[name] = 'Login should use at least one letter';
          return;
        }

        if (!value.match(LATIN_LETTERS)) {
          errors[name] = 'Login should use only latin letters';
          return;
        }

        if (!value.match(ONE_SPACE_SYMBOL)) {
          errors[name] = 'Login should not contain space symbols';
          return;
        }

        if (value.match(SPECIAL_CHARACTERS)) {
          errors[name] = 'Login should not contain special symbols';
          return;
        }

        break;

      case ValidateType.Password:
      case ValidateType.NewPassword:
      case ValidateType.RepeatNewPassword:
      case ValidateType.OldPassword:
        if (!value.length) {
          errors[name] = 'Password can not be empty';
          return;
        }

        if (value.length > 40 || value.length < 8) {
          errors[name] = 'Password must contain from 8 to 40 symbols';
          return;
        }

        if (!value.match(ONE_CAPITAL_LETTER)) {
          errors[name] = 'Password must contain one capital letter at least';
          return;
        }

        if (!value.match(ONE_DIGIT)) {
          errors[name] = 'Password must contain one digit at least';
          return;
        }

        break;

      case ValidateType.Email:
        if (!value.length) {
          errors[name] = 'Email can not be empty';
          return;
        }

        if (!value.match(EMAIL_CHARACTERS)) {
          errors[name] = 'Invalid e-mail address';
          return;
        }

        break;

      case ValidateType.Phone:
        if (!value.length) {
          errors[name] = 'Phone can not be empty';
          return;
        }

        if (!value.match(NO_DIGITS)) {
          errors[name] = 'Phone number must not contain letters';
          return;
        }

        if (!value.match(PHONE_SYMBOLS)) {
          errors[name] = 'Invalid phone number';
          return;
        }

        break;

      case ValidateType.FirstName:
      case ValidateType.SecondName:
      case ValidateType.DisplayName:
        if (!value.length) {
          errors[name] = 'Name can not be empty';
          return;
        }

        if (!value.match(ONLY_LETTERS_AND_DASH)) {
          errors[name] = 'Name must contain only letters and dash';
          return;
        }

        if (!value.match(FIRST_CAPITAL_LETTER)) {
          errors[name] = 'Name should begin with a capital letter';
          return;
        }

        break;

      case ValidateType.Message:
        if (!value.length) {
          errors[name] = 'Your message is empty';
          return;
        }

        break;

      default:
        errors[name] = 'Unknown error';
    }
  });

  return errors;
};
