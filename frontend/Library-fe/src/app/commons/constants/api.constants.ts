import { urlsafe } from '../utils/http.utils';

/* USERS ENDPOINTS
 */
export const USERS = '/api/user/';
/* AUTH ENDPOINTS
 */
export const AUTH_USER = urlsafe(USERS, 'auth');
export const AUTH_LOGIN = urlsafe(USERS, 'login');
export const AUTH_REGISTER = urlsafe(USERS, 'register');
export const AUTH_USER_ID = urlsafe(USERS, 'auth-user');
/* BOOK ENDPOINTS
 */
export const BOOKS = '/api/book/';
export const OWNED_BOOK = urlsafe(BOOKS, 'owned-books');