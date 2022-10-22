export type APIError = {
  reason: string;
  status: string;
};

export type UserFromServer = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};
