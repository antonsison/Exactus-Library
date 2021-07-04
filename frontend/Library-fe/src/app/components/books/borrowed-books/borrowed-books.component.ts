import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { SearchForm } from 'src/app/commons/forms/search.forms';
import { Book } from 'src/app/commons/models/book.model';
import { SearchModel } from 'src/app/commons/models/search.model';
import { BookService } from 'src/app/commons/services/books/book.service';
import { BookDetailsComponent } from '../../main/modals/book-details/book-details.component';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {

  form: SearchForm;
  all_book: Book[] = [];
  book_list: Book[] = [];
  
  constructor(
    public bookService: BookService,
    private simpleModalService: SimpleModalService
  ) { }

  ngOnInit(): void {
    this.form = new SearchForm(new SearchModel);

    this.bookService.allBooks().subscribe(
      (data: Book[]) => {
        this.book_list = data;
        this.all_book = data;
      }, error => {
        console.log(error)
      }
    )
  }

  onSubmit({ value, valid }: { value: SearchModel, valid: boolean }) {
    if (valid) {
      this.book_list = this.all_book.filter(x => x.title.toLowerCase().includes(value.search_text.toLowerCase()));
    } else {
      if (value.search_text === '') {
        this.book_list = this.all_book;
      }
    }
  }

  filterClick(event, status) {
    event.preventDefault();
    if (status === 'all') {
      this.book_list = this.all_book;
    } else if (status === 'digital copy') {
      this.book_list = this.all_book.filter(x => x.category === 'digital copy');
    } else {
      this.book_list = this.all_book.filter(x => x.status === status);
    }

    this.form.form.controls['search_text'].setValue(null);
  }

  bookDetails(event, book){
    event.preventDefault();
    this.simpleModalService.addModal(BookDetailsComponent, { 'book': book }).subscribe(
      (modal_data: Book) => {

      }
    )
  }

}
