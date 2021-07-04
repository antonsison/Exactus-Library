import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/commons/services/auth/auth.service';
import { StateService } from '@uirouter/core';
import { LoginForm } from 'src/app/commons/forms/login.forms';
import { Login } from 'src/app/commons/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : LoginForm;

  constructor(
    private auth: AuthService,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.form = new LoginForm(new Login);
    if (this.auth.authenticated()) {
      this.state.go('dashboard');
    } 
  }

  onSubmit({ value, valid }: { value: Login, valid: boolean }) {
    if (valid) {
      this.auth.login(value)
        .then(resp => {
          this.state.go('dashboard');
        }).catch(err => {
        
        })
      ;
    }
  }

  register(event) {
    event.preventDefault();
    this.state.go('register');
  }

}
