import { Dispatch } from 'store/Store';

export function startApp(dispatch: Dispatch<AppState>) {
  dispatch({ isAppStarted: true });
}
