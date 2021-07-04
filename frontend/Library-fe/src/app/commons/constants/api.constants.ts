import { urlsafe } from '../utils/http.utils';

/* USERS ENDPOINTS
 */
export const USERS = '/api/user/';
export const BOOKS = '/api/book/';
/* AUTH ENDPOINTS
 */
export const AUTH_USER = urlsafe(USERS, 'auth');
export const AUTH_LOGIN = urlsafe(USERS, 'login');
export const AUTH_REGISTER = urlsafe(USERS, 'register');
export const AUTH_USER_ID = urlsafe(USERS, 'auth-user');