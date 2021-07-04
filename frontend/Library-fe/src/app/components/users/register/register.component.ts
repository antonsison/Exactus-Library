import { Component, OnInit } from '@angular/core';
import { RegisterForm } from 'src/app/commons/forms/register.forms';
import { AuthService } from 'src/app/commons/services/auth/auth.service';
import { StateService } from '@uirouter/core';
import { Register } from 'src/app/commons/models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: RegisterForm;

  constructor(
    private auth: AuthService,
    private state: StateService
  ) { }

  ngOnInit(): void {
    this.form = new RegisterForm(new Register);
  }


  onSubmit({ value, valid }: { value: Register, valid: boolean }) {
    if (valid) {
      this.auth.register(value)
        .then(resp => {
          this.state.go('login', {'new': true});
        })
        .catch(err => {

        })
      ;
    }
  }

  redirectLogin(event) {
    event.preventDefault()
    if (this.auth.authenticated()) {
      this.state.go('logout');
    } else {
      this.state.go('login');
    }
  }

}
