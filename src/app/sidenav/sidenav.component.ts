import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  checkIfAuthenticated() {
    return this.isAuthenticated;
  }

  logout() {
    console.log('test');
    this.authService.logout();
    this.router.navigate(['']);
  }
}