import { Component, OnInit } from '@angular/core';
import { UpdateUserForm } from 'src/app/commons/forms/update-user.forms';
import { Register } from 'src/app/commons/models/register.model';
import { User } from 'src/app/commons/models/user.model';
import { AuthService } from 'src/app/commons/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  form: UpdateUserForm;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.form = new UpdateUserForm(new User);
    this.form.form.patchValue(this.auth.user)
  }

  onSubmit({ value, valid }: { value: User, valid: boolean }) {

    if (valid) {
      this.auth.updateUser(value).subscribe(
        (data: User) => {
          this.auth.setuser()
        }, error => {
          console.log(error)
        }
      )
    }
  }

}
