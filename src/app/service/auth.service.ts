import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { LoginResponse } from '../model/login-response.model';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
  baseUrl: string = 'https://pimb2bqatesting-api.dev01.pimalion.cloud';

  private user = new BehaviorSubject<User>({} as User);
  // currentUser will be used to change dynamically in profile component (if we log as another user we will be able to see differnt name, photo etc.)
  public currentUser = this.user.asObservable();
  constructor(private http: HttpClient) {
    if(this.isAuthenticated()) {
      let userString = (localStorage.getItem('user')) as string;
      let user = JSON.parse(userString) as User;
      this.setUser(user);
    }
  }

  setUser(newUser: User){
    this.user.next(newUser); 
  }

  login(username: string, password: string) : Observable<any>{
    return this.http.post<any>(this.baseUrl + '/app/Account/Login', {username: username, password: password})
      .pipe(map((loginResponse : LoginResponse) => {
        if (loginResponse.success && loginResponse.data.authorized) {
          this.setUser(loginResponse.data.tokenResponse.user);
          localStorage.setItem('user', JSON.stringify(loginResponse.data.tokenResponse.user));
          localStorage.setItem('token', loginResponse.data.tokenResponse.token);
          return true;
        }
        return loginResponse;
      }));
  }

  logout() {
    let userString = (localStorage.getItem('user')) as string;
    let user = JSON.parse(userString) as User;
    return this.http.post<any>(this.baseUrl + '/app/Account/Logout', {userId: user.id})
    .pipe().subscribe(()=> {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setUser({} as User);
    });
  }

  // TODO: If I had more time I would implement more 'observable' approach - with checking if user is authenticated and using refreshToken
  // right now users list just stops to load correctly - because of expired token
  isAuthenticated(): boolean {
    let user = localStorage.getItem('user');
    if(user) {
      return true;
    }
    return false;
  }

  getToken(): string | null{
    let token = localStorage.getItem('token');
    return token;
  }
}