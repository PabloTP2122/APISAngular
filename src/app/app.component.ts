import { Component } from '@angular/core';
import { User } from './models/user.model';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  prof: User = {
    id: '',
    name: '',
    email: '',
    password: 0
  };

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {

  }
  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
