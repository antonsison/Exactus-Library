import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
  BOOKS, 
  OWNED_BOOK, 
  ADD_BOOK, 
  UPDATE_BOOK,
  CHECKOUT_BOOK,
  RETURN_BOOK, 
  BOOKS_AUTHORS, 
  ADD_AUTHOR, 
  BOOK_COMMENTS,
  ADD_COMMENT, 
  DELETE_COMMENT,
  BORROWED_BOOKS } from '../../constants/api.constants'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
  ) { }

  allBooks(){
    return this.http.get(BOOKS);
  }

  ownedBooks(){
    return this.http.get(OWNED_BOOK);
  }

  borrowedBooks() {
    return this.http.get(BORROWED_BOOKS);
  }

  returnBook(book_id){
    return this.http.post(RETURN_BOOK, {'book_id': book_id});
  }

  addBook(book_obj){
    return this.http.post(ADD_BOOK, book_obj);
  }

  updateBook(book_obj){
    return this.http.put(UPDATE_BOOK, book_obj);
  }

  checkoutBook(data) {
    return this.http.post(CHECKOUT_BOOK, data);
  }

  allAuthors(){
    return this.http.get(BOOKS_AUTHORS);
  }

  addAuthor(author_obj){
    return this.http.post(ADD_AUTHOR, author_obj);
  }

  getComments(book_id){
    return this.http.get(BOOK_COMMENTS, { params: {'book_id': book_id}});
  }

  addComment(data) {
    return this.http.post(ADD_COMMENT, data);
  }

  deleteComment(data) {
    return this.http.post(DELETE_COMMENT, data);
  }
}
