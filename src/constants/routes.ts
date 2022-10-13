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
  },
  {
    pathname: '/signin',
    view: SigninPage,
  },
  {
    pathname: '/signup',
    view: SignupPage,
  },
  {
    pathname: '/main',
    view: MainPage,
  },
  {
    pathname: '/profile',
    view: Profile,
  },
  {
    pathname: '/changeUserData',
    view: ChangeUserData,
  },
  {
    pathname: '/changeUserPassword',
    view: ChangeUserPassword,
  },
  {
    pathname: '/changeUserAvatar',
    view: ChangeUserAvatar,
  },
];
