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
  form_submitted:boolean = false;
  backend_error: boolean = false;
  password_match_error:boolean = false;

  constructor(
    private auth: AuthService,
    private state: StateService
  ) { }

  ngOnInit(): void {
    this.form = new RegisterForm(new Register);
  }


  onSubmit({ value, valid }: { value: Register, valid: boolean }) {
    this.form_submitted=true;
    this.backend_error=false;
    this.password_match_error=false;
    if (valid) {
      if(value.password != value.confirm_password){
        this.password_match_error=true;
      } else {
        this.form_submitted=false;
        this.password_match_error=false;
        this.auth.register(value)
          .then(resp => {
            this.state.go('login', {'new': true});
          })
          .catch(err => {
            this.backend_error=true;
            console.log(err)
          })
        ;
      }
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
