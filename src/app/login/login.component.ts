import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
   }

  onSubmit() {
    this.invalidLogin = false;
    this.submitted = true;

    const {userName, password} = this.loginForm.value;
    this.authService.login(userName, password).subscribe((user)=> {
      if(user) {
        this.router.navigate(['users']);
      }
      else {
        this.invalidLogin = true;
      }
    }, (error) => console.log(error));
  }
}