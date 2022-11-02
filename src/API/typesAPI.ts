export type APIError = {
  reason: string;
  status: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

export type ChangePasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

export type SignupRequestData = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

export type ChatFromServer = {
  id: number;
  title: string;
  avatar: Record<string, any>;
  created_by: number;
  unread_count: number;
  last_message: Record<string, any>;
};

export type CreateChatRequestData = {
  title: string;
};
export type GetUserByLoginRequestData = {
  login: string;
};

export type DeleteChatRequestData = {
  chatId: number;
};

export type DeleteChatResponseData = {
  userId: number;
  result: Record<string, unknown>;
};

export type UserToChatRequestData = {
  users: number[];
  chat: ChatType;
};

export type UserToChatData = {
  login: string;
  chat: ChatType;
};

export type ChatUsersRequestData = {
  chatId: number;
};

export type UnreadCountResponseData = {
  unread_count: number;
};

export type ResponseData = {} | APIError;

export enum ResponseStatus {
  OK = 'ok',
}

export type WebSocketMessage = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type UserKeys =
  | 'login'
  | 'firstName'
  | 'secondName'
  | 'avatar'
  | 'phone'
  | 'email'
  | 'displayName';

export type ChangeProfileKeys =
  | 'login'
  | 'first_name'
  | 'second_name'
  | 'phone'
  | 'email'
  | 'display_name';

export type SignupData = Record<UserKeys, string>;

export type ChangeProfileRequestData = Record<ChangeProfileKeys, string>;

export type UserFromServer = ChangeProfileRequestData & {
  id: number;
  avatar: string;
};
