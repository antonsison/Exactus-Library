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
export const BOOKS_AUTHORS = urlsafe(BOOKS, 'authors');
export const ADD_AUTHOR = urlsafe(BOOKS, 'add-author');
export const ADD_BOOK = urlsafe(BOOKS, 'add-book');
export const UPDATE_BOOK = urlsafe(BOOKS, 'update-book');
export const BOOK_COMMENTS = urlsafe(BOOKS, 'comments');
export const DELETE_COMMENT = urlsafe(BOOKS, 'delete-comment');
export const ADD_COMMENT = urlsafe(BOOKS, 'add-comment');