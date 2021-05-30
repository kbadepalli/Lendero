import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import client from './client';
import loan from './loan';
import role from './role';
import user from './user';
export default combineReducers({ alert, auth, client, loan, role, user });
