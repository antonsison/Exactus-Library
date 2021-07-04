import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { SearchForm } from 'src/app/commons/forms/search.forms';
import { Book } from 'src/app/commons/models/book.model';
import { SearchModel } from 'src/app/commons/models/search.model';
import { BookService } from 'src/app/commons/services/books/book.service';
import { EditBookComponent } from 'src/app/components/main/modals/edit-book/edit-book.component';
import { BookDetailsComponent } from 'src/app/components/main/modals/book-details/book-details.component';

@Component({
  selector: 'app-owned-books',
  templateUrl: './owned-books.component.html',
  styleUrls: ['./owned-books.component.css']
})
export class OwnedBooksComponent implements OnInit {

  form: SearchForm;
  all_book: Book[] = [];
  book_list: Book[] = [];

  constructor(
    public state: StateService,
    public bookService: BookService,
    private simpleModalService: SimpleModalService
  ) { }

  ngOnInit(): void {
    this.form = new SearchForm(new SearchModel);

    this.bookService.ownedBooks().subscribe(
      (data: Book[]) => {
        this.book_list = data;
        this.all_book = data;
      }, error => {
        console.log(error)
      }
    )
  }

  addBook(event){
    event.preventDefault();
    this.state.go('add-book')
  }

  editBook(book){
    this.simpleModalService.addModal(EditBookComponent, {'book': book}).subscribe(
      (modal_data: Book) => {
        if(modal_data) {
          this.bookService.updateBook(modal_data).subscribe(
            (data: Book) => {
              book.title=modal_data.title
              book.location=modal_data.location
              book.category=modal_data.category
              book.author=modal_data.author
            }, error => {
              console.log(error)
            }
          )
        }
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
    event.preventDefault()
    this.simpleModalService.addModal(BookDetailsComponent, { 'book': book }).subscribe(
      (modal_data: Book) => {

      }
    )
  }
}
