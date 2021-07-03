import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export class LoginForm {
  public form: FormGroup;

  constructor (data) {
    /* Initialize the form builder
    */
    this.form = new FormBuilder().group({
      email    : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required])
    });
  }
}