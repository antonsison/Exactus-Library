import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BOOKS, OWNED_BOOK, BOOKS_AUTHORS, ADD_AUTHOR } from '../../constants/api.constants'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
  ) { }

  allBooks(){
    return this.http.get(BOOKS)
  }

  ownedBooks(){
    return this.http.get(OWNED_BOOK)
  }

  allAuthors(){
    return this.http.get(BOOKS_AUTHORS)
  }

  addAuthor(author_obj){
    return this.http.post(ADD_AUTHOR, author_obj)
  }
}
