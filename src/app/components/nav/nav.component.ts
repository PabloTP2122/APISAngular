import { Component, Input, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service'

import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  imgParent = '';
  showImg = true;
  prof: User | null = null;

  @Input() getProf = '';

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  createUser() {
    this.usersService.create(
      {
        name: 'Pancho',
        email: 'pancho@mail.com',
        password: 12548
      }
    )
      .subscribe(rta => {
        console.log(rta);
      }
      )
  }
  login() {
    this.authService.loginAndGet('pancho@mail.com', '12548')
      .subscribe(profile => {
        this.prof = profile;
        console.log(this.prof.email)
      });
  }
  /* getProfile() {
    this.authService.profile()
      .subscribe(profile => {
        console.log(profile.name);
        this.prof = profile;
      }
      );
  } */

}
