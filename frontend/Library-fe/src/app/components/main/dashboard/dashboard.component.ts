import { Component, OnInit } from '@angular/core';
import { SearchForm } from 'src/app/commons/forms/search.forms';
import { SearchModel } from 'src/app/commons/models/search.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: SearchForm;

  constructor() { }

  ngOnInit(): void {
    this.form = new SearchForm(new SearchModel);
  }

}
