import { Component } from '@angular/core';
import { User } from './models/user.model';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

import { FilesService } from './services/files.service';



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
  imgRta = '';
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fileService: FilesService
  ) {

  }
  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  download() {
    this.fileService.getFile('Archivo', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe();
  }
  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0) as Blob;
    if (file) {
      this.fileService.uploadFile(file).
        subscribe(rta => {
          this.imgRta = rta.location;
          console.log(rta.location);
        });
    }
  }
}
