import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export class CommentForm {
  public form: FormGroup;

  constructor (data) {
    /* Initialize the form builder
    */
    this.form = new FormBuilder().group({
        message       : new FormControl(data.message, [Validators.required]),
        book_id      : new FormControl(data.book_id, [Validators.required]),
        user       : new FormControl(data.user),
    });
  }
}