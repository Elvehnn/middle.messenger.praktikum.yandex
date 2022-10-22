import { UserFromServer } from 'API/typesAPI';

export const transformUserObject = (data: UserFromServer): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};
