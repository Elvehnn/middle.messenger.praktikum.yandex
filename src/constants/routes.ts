import SigninPage from 'pages/signin/signin';
import SignupPage from 'pages/signup/signup';
import MainPage from 'pages/main/main';
import Profile from 'pages/profile/profile';
import NotFound from 'pages/notFound/notFound';
import ChangeUserData from 'pages/changeUserData/changeUserData';
import ChangeUserPassword from 'pages/changeUserPassword/changeUserPassword';

export const ROUTS: Array<PartialRouteProps> = [
  {
    pathname: '/',
    view: SigninPage,
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
    pathname: '/404',
    view: NotFound,
    isPrivate: false,
  },
];
