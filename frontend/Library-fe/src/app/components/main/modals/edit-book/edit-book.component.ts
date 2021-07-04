import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";
import { BookForm } from 'src/app/commons/forms/book.forms';
import { Author } from 'src/app/commons/models/author.model';
import { Book } from 'src/app/commons/models/book.model';
import { BookService } from 'src/app/commons/services/books/book.service';

export interface BookModel {
  book: any
}

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent extends SimpleModalComponent<BookModel, any> implements OnInit {

  form: BookForm;
  book: any;
  all_author: Author[] = [];
  author_list: Author[] = [];

  constructor(
    private bookService: BookService
  ) {
    super();
  }

  ngOnInit() {
    this.form = new BookForm(new Book);
    this.form.form.patchValue(this.book);

    this.bookService.allAuthors().subscribe(
      (data: Author[]) => {
        this.all_author = data;
        this.author_list = data;
      }, error => {
        console.log(error)
      }
    )
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
      if (this.form.form.dirty) {
        this.result = value;
      }
      this.close();
    }
  }

}
