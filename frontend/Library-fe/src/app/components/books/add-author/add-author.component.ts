import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { AuthorForm } from 'src/app/commons/forms/author.forms';
import { Author } from 'src/app/commons/models/author.model';
import { BookService } from 'src/app/commons/services/books/book.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  form: AuthorForm;
  constructor(
    private bookService: BookService,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.form = new AuthorForm(new Author);
  }

  onSubmit({ value, valid }: { value: Author, valid: boolean }) {

    if (valid) {
      this.bookService.addAuthor(value).subscribe(
        (data: Author) => {
          this.state.go('author-list')
        }, error => {
          console.log(error)
        }
      )
    }
  }
}
