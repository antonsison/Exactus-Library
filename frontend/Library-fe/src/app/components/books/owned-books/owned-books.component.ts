import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';

@Component({
  selector: 'app-owned-books',
  templateUrl: './owned-books.component.html',
  styleUrls: ['./owned-books.component.css']
})
export class OwnedBooksComponent implements OnInit {

  constructor(
    public state: StateService
  ) { }

  ngOnInit(): void {
  }

  addBook(event){
    event.preventDefault();
    this.state.go('add-book')
  }
}
