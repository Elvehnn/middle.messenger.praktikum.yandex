import { RouteProps } from 'core/Route';
import SigninPage from 'pages/signin/signin';
import SignupPage from 'pages/signup/signup';
import StartPage from 'pages/start/start';
import MainPage from 'pages/main/main';
import Profile from 'pages/profile/profile';
import ChangeUserData from 'pages/changeUserData/changeUserData';
import ChangeUserPassword from 'pages/changeUserPassword/changeUserPassword';
import ChangeUserAvatar from 'pages/changeUserAvatar/changeUserAvatar';

export const ROUTS: Array<RouteProps> = [
  {
    pathname: '/',
    view: StartPage,
    isPrivate: false,
  },
  {
    pathname: '/signin',
    view: SigninPage,
    isPrivate: false,
  },
  {
    pathname: '/signup',
    view: SignupPage,
    isPrivate: false,
  },
  {
    pathname: '/main',
    view: MainPage,
    isPrivate: true,
  },
  {
    pathname: '/profile',
    view: Profile,
    isPrivate: true,
  },
  {
    pathname: '/changeUserData',
    view: ChangeUserData,
    isPrivate: true,
  },
  {
    pathname: '/changeUserPassword',
    view: ChangeUserPassword,
    isPrivate: true,
  },
  {
    pathname: '/changeUserAvatar',
    view: ChangeUserAvatar,
    isPrivate: true,
  },
];
