import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  username: string = '';
  initials: string = '';

  constructor(private authService: AuthService) {
    
    this.authService.currentUser.subscribe((user: User) => {
      this.username = user.firstName + ' ' + user.lastName;
      this.initials = (user.firstName.length > 0 ? user.firstName.charAt(0) : '') + (user.lastName.length > 0 ? user.lastName.charAt(0) : '');
    })
  }
}