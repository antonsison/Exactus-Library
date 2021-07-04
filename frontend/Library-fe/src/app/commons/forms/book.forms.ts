import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export class BookForm {
  public form: FormGroup;

  constructor (data) {
    /* Initialize the form builder
    */
    this.form = new FormBuilder().group({
      id          : new FormControl(null),
      title       : new FormControl(null, [Validators.required]),
      author      : new FormControl(null, [Validators.required]),
      category    : new FormControl(null, [Validators.required]),
      location    : new FormControl(null, [Validators.required]),
    });
  }
}