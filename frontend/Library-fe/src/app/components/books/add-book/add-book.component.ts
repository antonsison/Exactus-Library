import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { BookForm } from 'src/app/commons/forms/book.forms';
import { Book } from 'src/app/commons/models/book.model';
import { BookService } from 'src/app/commons/services/books/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  form: BookForm;
  constructor(
    private bookService: BookService,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.form = new BookForm(new Book);
  }

  onChangeCategory(){
    if(this.form.form.controls['category'].value === 'digital copy'){
      this.form.form.controls['location'].setValue('in the matrix')
    } else if(this.form.form.controls['location'].value === 'in the matrix' &&
    this.form.form.controls['category'].value !== 'digital copy'){
      this.form.form.controls['location'].setValue('exactus office')
    }
  }

  onSubmit({ value, valid }: { value: Book, valid: boolean }) {
    if (valid) {
      this.bookService.addBook(value).subscribe(
        (data: Book) => {
          this.state.go('owned-books')
        }, error => {
          console.log(error)
        }
      )
    }
  }
}
