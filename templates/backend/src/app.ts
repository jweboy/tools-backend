import { history } from 'umi';
import { HOME_PAGE, LOGIN_PAGE } from './constants';
import localStorage from './utils/storage';

export function render(oldRender) {
  const auth = localStorage.get('auth');

  if (auth !== null) {
    history.push(HOME_PAGE);
    oldRender();
  } else {
    history.push(LOGIN_PAGE);
    oldRender();
  }
}
