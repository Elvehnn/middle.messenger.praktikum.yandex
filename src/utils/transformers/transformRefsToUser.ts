import { ChangeProfileKeys, SignupData, UserFromServer } from 'API/typesAPI';

export const userKeysMap = new Map(
  Object.entries({
    login: 'login',
    firstName: 'first_name',
    secondName: 'second_name',
    avatar: 'avatar',
    phone: 'phone',
    email: 'email',
    displayName: 'display_name',
  })
);

export const transformRefsToUser = (refs: Partial<SignupData>) => {
  return Object.entries(refs).reduce((acc, [key, value]) => {
    const mappedKey = userKeysMap.get(key) as ChangeProfileKeys;
    acc = { ...acc, [mappedKey]: value };
    return acc;
  }, {} as Partial<UserFromServer>);
};
