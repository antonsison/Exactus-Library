import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BOOKS } from '../../constants/api.constants'
import { Book } from '../../models/book.model'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
  ) { }

  allBooks(){
    this.http.get(BOOKS).subscribe(
      (data: Book) => {
        console.log(data)
      }, error => {
        console.log(error)
      }
    )
  }
}
