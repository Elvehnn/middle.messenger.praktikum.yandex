declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  export type Indexed<T = unknown> = {
    [key in string]: T;
  };

  export type AppState = {
    view: BlockConstructable | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: User | null;
    isAppStarted: boolean;
  };

  export type User = {
    isAuth: boolean;
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    avatar: string;
    phone: string;
    email: string;
  };
}

export {};
