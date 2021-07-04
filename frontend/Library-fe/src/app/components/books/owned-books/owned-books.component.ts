import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { SearchForm } from 'src/app/commons/forms/search.forms';
import { SearchModel } from 'src/app/commons/models/search.model';

@Component({
  selector: 'app-owned-books',
  templateUrl: './owned-books.component.html',
  styleUrls: ['./owned-books.component.css']
})
export class OwnedBooksComponent implements OnInit {

  form: SearchForm;

  constructor(
    public state: StateService
  ) { }

  ngOnInit(): void {
    this.form = new SearchForm(new SearchModel);
  }

  addBook(event){
    event.preventDefault();
    this.state.go('add-book')
  }
}
