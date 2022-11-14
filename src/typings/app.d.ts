declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;

  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed<T = unknown> = {
    [key in string]: T;
  };

  export type UserType = {
    id: number;
    displayName: string;
    login: string;
    firstName: string;
    secondName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type ChatType = {
    id: number;
    title: string;
    avatar: string;
    createdBy: number;
    unreadCount: number;
    lastMessage: Record<string, unknown>;
    chatUsers?: Array<UserType>;
    chatToken?: string;
  };

  export type AppState = {
    currentRoutePathname: string;
    view: BlockConstructable | null;
    isLoading: boolean;
    errorMessage: string | null;
    user: UserType | null;
    isAppStarted: boolean;
    chats: Nullable<Array<ChatType>>;
    selectedChat: Nullable<ChatType>;
    isPopupShown: boolean;
  };

  export type ErrorRef = {
    errorRef?: BlockClass;
  };

  export type ParentRefs = ErrorRef & Record<string, BlockClass>;

  export type RefsObject = Record<string, HTMLInputElement>;

  export type RouteProps = {
    pathname: string;
    view: BlockConstructable;
    isPrivate: boolean;
    callback: () => void;
  };

  export type PartialRouteProps = Omit<RouteProps, 'callback'>;

  export interface IRouter {
    routes: Array<Route>;
  }

  export interface SubmitEvent extends Event {
    submitter: HTMLElement;
  }
}

export {};
