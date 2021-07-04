import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { SearchForm } from 'src/app/commons/forms/search.forms';
import { Author } from 'src/app/commons/models/author.model';
import { SearchModel } from 'src/app/commons/models/search.model';
import { BookService } from 'src/app/commons/services/books/book.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  form: SearchForm;
  all_author: Author[] = [];
  author_list: Author[] = [];

  constructor(
    public bookService: BookService,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.form = new SearchForm(new SearchModel);

    this.bookService.allAuthors().subscribe(
      (data: Author[]) => {
        this.all_author = data;
        this.author_list = data;
      }, error => {
        console.log(error)
      }
    )
  }

  addAuthor(event){
    event.preventDefault()
    this.state.go('add-author')
  }

  onSubmit({ value, valid }: { value: SearchModel, valid: boolean }) {
    if (valid) {
      this.author_list = this.all_author.filter(x => x.last_name.toLowerCase().includes(value.search_text.toLowerCase()));
    } else {
      if (value.search_text === '') {
        this.author_list = this.all_author;
      }
    }
  }

}
