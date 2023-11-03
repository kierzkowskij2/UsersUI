import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "../model/user.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://pimb2bqatesting-api.dev01.pimalion.cloud';

  getUsers() : Observable<any>{
    return this.http.post(this.baseUrl + '/app/User/List', {});
  }

  getUserById(id: string) : Observable<any>{
    return this.http.post(this.baseUrl + '/app/User/Get', { id: id});
  }

  createUser(user: User) : Observable<any>{
    return this.http.post(this.baseUrl + '/app/User/Create', { user });
  }

  // TODO: received 'WtfException' from api for empty user data in update endpoint

  updateUser(user: User) : Observable<any>{
    return this.http.post(this.baseUrl + '/app/User/Update', { user });
  }

  deleteUser(id: string) : Observable<any> {
    return this.http.post(this.baseUrl + '/app/User/Delete', {id: id});
  }
}