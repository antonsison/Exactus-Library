import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export class RegisterForm {
  public form: FormGroup;

  constructor (data) {
    /* Initialize the form builder
    */
    this.form = new FormBuilder().group({
      first_name    : new FormControl(null, [Validators.required]),
      last_name    : new FormControl(null, [Validators.required]),
      email    : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required]),
      confirm_password : new FormControl(null, [Validators.required]),
    });
  }
}