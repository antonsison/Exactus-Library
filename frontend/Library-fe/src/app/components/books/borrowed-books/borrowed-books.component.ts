import { Component, OnInit } from '@angular/core';
import { SearchForm } from 'src/app/commons/forms/search.forms';
import { SearchModel } from 'src/app/commons/models/search.model';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {

  form: SearchForm;
  constructor() { }

  ngOnInit(): void {
    this.form = new SearchForm(new SearchModel);
  }

}
