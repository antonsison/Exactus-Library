import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { BookForm } from 'src/app/commons/forms/book.forms';
import { Author } from 'src/app/commons/models/author.model';
import { Book } from 'src/app/commons/models/book.model';
import { BookService } from 'src/app/commons/services/books/book.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  form: BookForm;
  dropdownSettings: IDropdownSettings = {};
  selectedItems = [];
  all_author: Author[] = [];
  author_list: Author[] = [];

  constructor(
    private bookService: BookService,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.form = new BookForm(new Book);

    this.bookService.allAuthors().subscribe(
      (data: Author[]) => {
        this.all_author = data;
        this.author_list = data;
      }, error => {
        console.log(error)
      }
    )

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'full_name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
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
    this.form.form.patchValue({
      'author': this.selectedItems
    })
    if (valid && this.selectedItems.length != 0) {
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
