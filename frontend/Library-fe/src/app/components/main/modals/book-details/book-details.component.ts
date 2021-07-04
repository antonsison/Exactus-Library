import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";
import { CommentForm } from 'src/app/commons/forms/comment.forms';
import { CommentModel } from 'src/app/commons/models/comment.model';
import { AuthService } from 'src/app/commons/services/auth/auth.service';
import { BookService } from 'src/app/commons/services/books/book.service';

export interface BookModel {
  book: any
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent extends SimpleModalComponent<BookModel, any> implements OnInit {

  form: CommentForm;
  book: any;
  isCheckedOut: boolean = false;
  comments_list: CommentModel[] = [];
  form_submitted: boolean = false;

  constructor(
    private bookService: BookService,
    public authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.intializeForm();
    this.bookService.getComments(this.book.id).subscribe(
      (data: CommentModel[]) => {
        this.comments_list = data
      }
    );

    if(this.book.status === 'checked out'){
      this.isCheckedOut = true;
    }
  }

  intializeForm() {
    this.form = new CommentForm(new CommentModel);
    this.form.form.controls['book_id'].setValue(this.book.id);
    this.form.form.controls['user'].setValue(this.authService.user_id);
  }

  onSubmit({ value, valid }: { value: CommentModel, valid: boolean }) {
    this.form_submitted = true;
    if (valid) {
      this.form_submitted = false;
      this.bookService.addComment(value).subscribe(
        (data: CommentModel) => {
          this.comments_list.push(data);
          this.intializeForm();
        }, error => {
          console.log(error);
          this.intializeForm();
        }
      );
    }
  }

  deleteClick(comment_id) {
    this.bookService.deleteComment({'comment_id': comment_id}).subscribe(
      data => {
        this.comments_list = this.comments_list.filter(x => x.id !== comment_id);
      }, error => {
        console.log(error);
      }
    );
  }

  borrowBook() {
    this.bookService.checkoutBook({book_id: this.book.id}).subscribe(
      data => {
        this.book.status = 'checked out';
        this.isCheckedOut = true;
      }, error => {
        console.log(error);
      }
    );
  }

}
