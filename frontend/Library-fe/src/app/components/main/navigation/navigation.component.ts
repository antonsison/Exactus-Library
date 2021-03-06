import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { AuthService } from 'src/app/commons/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    public state: StateService,
    public auth: AuthService,
  ) { }

  async ngOnInit() {

    if (this.auth.user.id == null) {
      await this.auth.setuser();
    }

    setTimeout(() => {
      this.auth.getUser();
    }, 2000);
  }

  dropdownClick(event){
    event.preventDefault();
  }

  navigationRedirect(event, route){
    event.preventDefault();
    this.state.go(route);
  }

}
