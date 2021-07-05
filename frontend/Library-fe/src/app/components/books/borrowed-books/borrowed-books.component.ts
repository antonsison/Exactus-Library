import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { SearchForm } from 'src/app/commons/forms/search.forms';
import { SearchModel } from 'src/app/commons/models/search.model';
import { BookService } from 'src/app/commons/services/books/book.service';
import { BookDetailsComponent } from '../../main/modals/book-details/book-details.component';
import { CheckedOutModel } from 'src/app/commons/models/checked-out.model';
import { Book } from 'src/app/commons/models/book.model';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {

  form: SearchForm;
  all_checked_out_book: CheckedOutModel[] = [];
  checked_out_book_list: CheckedOutModel[] = [];
  
  constructor(
    public bookService: BookService,
    private simpleModalService: SimpleModalService
  ) { }

  ngOnInit(): void {
    this.form = new SearchForm(new SearchModel);

    this.bookService.borrowedBooks().subscribe(
      (data: CheckedOutModel[]) => {
        this.checked_out_book_list = data;
        this.all_checked_out_book = data;
      }, error => {
        console.log(error);
      }
    )
  }

  onSubmit({ value, valid }: { value: SearchModel, valid: boolean }) {
    if (valid) {
      this.checked_out_book_list = this.all_checked_out_book.filter(x => x.book.title.toLowerCase().includes(value.search_text.toLowerCase()));
    } else {
      if (value.search_text === '') {
        this.checked_out_book_list = this.all_checked_out_book;
      }
    }
  }

  filterClick(event, status) {
    event.preventDefault();
    if (status === 'all') {
      this.checked_out_book_list = this.all_checked_out_book;
    } else if (status === 'digital copy') {
      this.checked_out_book_list = this.all_checked_out_book.filter(x => x.book.category === 'digital copy');
    } else {
      this.checked_out_book_list = this.all_checked_out_book.filter(x => x.book.status === status);
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

  returnBook(book_id){
    this.bookService.returnBook(book_id).subscribe(
      data => {
        console.log(data)
      }
    )
  }

}
