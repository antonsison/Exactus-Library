import * as _ from 'lodash';

import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user.model';

export function LoginRequired(t) {
  let auth = t.injector().get(AuthService),
      state = t.router.stateService;

  if(!auth.authenticated()) return state.target('login');

}

export function Disconnect(t) {
  let auth = t.injector().get(AuthService),
      state = t.router.stateService;

  if(auth.authenticated())
  {
    auth.rmToken();
    auth.user = new User();
  }
  return state.target('login', {next: '/dashboard/'});

}